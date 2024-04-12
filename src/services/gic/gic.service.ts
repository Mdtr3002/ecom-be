import { injectable, inject } from 'inversify';
import _ from 'lodash';
import { FilterQuery, Types, UpdateQuery } from 'mongoose';
import { ServiceType } from '../../types';
import { FileUploadService } from '../file-upload.service';
import { FileCompressionStrategy } from '../../lib/file-compression/strategies';
import GICContestRegModel, {
    ContestRegStatus,
    GICContestRegDocument,
} from '../../models/gic/contest_registration.model';
import DayRegModel, {
    DayRegDocument,
    DayRegStatus,
} from '../../models/gic/day_registration.model';
import { ItemService } from '../item.service';
import { ItemDocument } from '../../models/item.model';
import {
    GACHA_COST,
    GACHA_COST_PACK,
    GicItem,
    GicItemName,
    GicRare,
    GicRarity,
    PREMIUM_GACHA_COST,
    PREMIUM_GACHA_COST_PACK,
    gachaRarity,
    gicItems,
    premiumGachaRarity,
    random,
    GicCombineName,
    itemsName,
} from './utils';
import { UserService } from '../user.service';
import { SYSTEM_ACCOUNT_ID } from '../../config';
import { TransactionService } from '../transaction.service';
import GicGiftModel from '../../models/gic/gic_gift';
import { GICAchievementService } from './gic_achievement.service';
import { SocketService } from '../../server-events/index';
import AsyncLock from 'async-lock';
import GICVoteModel, { GICVoteStatus } from '../../models/gic/gic_vote.model';

const TEAMS_TO_VOTE: Types.ObjectId[] = [
    new Types.ObjectId('6488a4b602105d6d34c6b627'), // PomoStudy
    new Types.ObjectId('648b3bb3bfc578caa43a9328'), // UniSpace
    new Types.ObjectId('648c6e1c77a97363e8d3df96'), // JobTask
    new Types.ObjectId('648d991a77a97363e8d41c64'), // Jessica AI Bot
    new Types.ObjectId('648dc46d77a97363e8d42796'), // SWiM
    new Types.ObjectId('648defea77a97363e8d43243'), // Phan mem ho tro hoan thanh muc tieu
    new Types.ObjectId('648efb34c529ad68ab29df2f'), // Polock
    new Types.ObjectId('648efd2bc529ad68ab29e05f'), // InformE
    new Types.ObjectId('648efdf3c529ad68ab29e0ae'), // HeyGuide!
    new Types.ObjectId('648efed6c529ad68ab29e10f'), // ICAS (Improving communication among students)
    new Types.ObjectId('648f0035c529ad68ab29e279'), // SchoMasters
];

@injectable()
export class GICService {
    private voteLock: AsyncLock;
    private checkinLock: AsyncLock;

    constructor(
        @inject(ServiceType.FileUpload)
        private fileUploadService: FileUploadService,
        @inject(ServiceType.Item) private itemService: ItemService,
        @inject(ServiceType.User) private userService: UserService,
        @inject(ServiceType.Transaction)
        private transactionService: TransactionService,
        @inject(ServiceType.GICAchievement)
        private gicAchievementService: GICAchievementService,
        @inject(ServiceType.Socket) private socketService: SocketService,
    ) {
        this.voteLock = new AsyncLock();
        this.checkinLock = new AsyncLock();
    }

    // FOR CONTESTS

    async registerContest(
        userId: Types.ObjectId,
        ideaName: string,
        members: any[],
        files: Express.Multer.File[],
        compresionStrategy: FileCompressionStrategy,
    ) {
        const uploadedFiles = await this.fileUploadService.uploadFiles(
            files,
            compresionStrategy,
        );
        const currentTime = Date.now();

        return await GICContestRegModel.create({
            registeredBy: userId,
            registeredAt: currentTime,
            ideaDescription: uploadedFiles[0]._id,
            ideaName: ideaName,
            status: ContestRegStatus.REGISTERED,
            members: members,
        });
    }

    async findContestRegs(query: FilterQuery<GICContestRegDocument> = {}) {
        return GICContestRegModel.find(query);
    }

    // to block spamming
    async rateLimitOnContestRegistration(userId: Types.ObjectId) {
        const now = Date.now();
        const cnt = await GICContestRegModel.count({
            registeredBy: userId,
            registeredAt: {
                $gte: now - 3600000,
                $lte: now,
            },
        });
        if (cnt > 3) {
            throw new Error(
                `Contest registration limit exceeded (3 registrations every hour)`,
            );
        }
    }

    async findCurrentContestRegistration(email: string) {
        return await GICContestRegModel.findOne({
            status: ContestRegStatus.REGISTERED,
            members: {
                $elemMatch: {
                    email: email,
                    confirmed: true,
                },
            },
        });
    }

    async userHasRegisteredContest(userId: Types.ObjectId) {
        return (
            (await GICContestRegModel.findOne({
                registeredBy: userId,
                status: ContestRegStatus.REGISTERED,
            })) != null
        );
    }

    async emailHasTeam(email: string) {
        return (await this.findCurrentContestRegistration(email)) != null;
    }

    async findOneContestRegAndUpdate(
        query: FilterQuery<GICContestRegDocument>,
        update: UpdateQuery<GICContestRegDocument>,
    ) {
        return await GICContestRegModel.findOneAndUpdate(query, update);
    }

    async findContestRegById(id: Types.ObjectId) {
        return await GICContestRegModel.findById(id);
    }

    async findContestRegByIdPopulate(id: Types.ObjectId) {
        return await GICContestRegModel.findById(id).populate('registeredBy');
    }

    // FOR DAY REGISTRATION

    async registerDay(
        userId: Types.ObjectId,
        day: number,
        inviteId: Types.ObjectId = undefined,
    ) {
        return await DayRegModel.create({
            registeredBy: userId,
            registeredAt: Date.now(),
            day: day,
            status: DayRegStatus.REGISTERED,
            invitedBy: inviteId,
        });
    }

    // block spamming day registration
    async rateLimitOnDayRegistration(userId: Types.ObjectId, day: number) {
        const now = Date.now();
        const cnt = await DayRegModel.count({
            registeredBy: userId,
            day: day,
            registeredAt: {
                $gte: now - 3600000,
                $lte: now,
            },
        });
        if (cnt > 3) {
            throw new Error(
                `Day registration limit exceeded (3 registrations every hour)`,
            );
        }
    }

    async findDayRegistrations(query: FilterQuery<DayRegDocument>) {
        return await DayRegModel.find(query);
    }

    async findOneDayRegistration(query: FilterQuery<DayRegDocument>) {
        return await DayRegModel.findOne(query);
    }

    async userHasRegisteredDay(userId: Types.ObjectId, day: number) {
        return (
            (await DayRegModel.findOne({
                registeredBy: userId,
                day: day,
                status: DayRegStatus.REGISTERED,
            })) != null
        );
    }

    async userHasCheckinDay(userId: Types.ObjectId, day: number) {
        return (
            (await DayRegModel.findOne({
                registeredBy: userId,
                day: day,
                status: DayRegStatus.CHECKIN,
            })) != null
        );
    }

    async findOneDayRegAndUpdate(
        query: FilterQuery<DayRegDocument>,
        update: UpdateQuery<DayRegDocument>,
    ) {
        return await DayRegModel.findOneAndUpdate(query, update);
    }

    async findDayRegById(id: Types.ObjectId) {
        return await DayRegModel.findById(id);
    }

    async checkin(userId: Types.ObjectId) {
        return await this.checkinLock.acquire('CHECKIN', async () => {
            if (await this.userHasCheckinDay(userId, 5)) {
                throw new Error(`User has already checkin to Idea Showcase`);
            }
            const maxIdeaBoardId = await DayRegModel.aggregate([
                {
                    $match: {
                        status: DayRegStatus.CHECKIN,
                    },
                },
                {
                    $group: {
                        _id: null,
                        max: { $max: '$ideaBoardId' },
                    },
                },
            ]);
            const nxt =
                maxIdeaBoardId[0]?.max == undefined
                    ? 1
                    : maxIdeaBoardId[0]?.max + 1;
            const reg = await DayRegModel.findOneAndUpdate(
                {
                    registeredBy: userId,
                    day: 5,
                    status: DayRegStatus.REGISTERED,
                },
                {
                    status: DayRegStatus.CHECKIN,
                    checkinAt: Date.now(),
                    ideaBoardId: nxt,
                },
                {
                    new: true,
                },
            );
            if (!reg) {
                throw new Error(`User has not registered for Idea Showcase`);
            }
            if (reg.invitedBy) {
                const invited = await DayRegModel.find({
                    day: 5,
                    status: DayRegStatus.CHECKIN,
                    invitedBy: reg.invitedBy,
                });
                if (invited.length == 1) {
                    await this.sendGicGift(
                        reg.invitedBy,
                        'Keychain',
                        'Invite 1 friend',
                    );
                } else if (invited.length == 3) {
                    await this.sendGicGift(
                        reg.invitedBy,
                        'Cup/Figure',
                        'Invite 3 friend',
                    );
                }
            }
            await this.sendGicGift(userId, 'Cup/Figure', '');
            return reg;
        });
    }

    async findAllCheckin() {
        let checkins = await DayRegModel.find({
            day: 5,
            status: DayRegStatus.CHECKIN,
        }).populate('registeredBy');
        return checkins;
    }

    async sendItemGIC(itemData: ItemDocument) {
        console.log('Send Item', itemData);
        const item = await this.itemService.createNewItem(itemData);
        return item;
    }

    // Gameeeeeeeee

    async findAllUserGicGift(userId: Types.ObjectId) {
        let gifts = await GicGiftModel.find({
            userId: userId,
        });
        return gifts;
    }

    async findAllGicGift() {
        let gifts = await GicGiftModel.find().populate('userId');
        return gifts;
    }

    async receiveGicGift(giftId: Types.ObjectId) {
        let gift = await GicGiftModel.findById(giftId);

        if (!gift) throw Error('Gift not existed');
        gift.isReceived = true;
        gift.reveicedAt = Date.now();
        gift.save();
        return gift;
    }

    async sendGicGift(
        userId: Types.ObjectId,
        name: string,
        description: string,
    ) {
        const gicGift = await GicGiftModel.create({
            userId,
            name,
            description,
            isReceived: false,
        });

        return gicGift;
    }

    async gacha(userId: Types.ObjectId) {
        const user = await this.userService.findById(userId);
        if (user.balance < GACHA_COST) {
            throw Error('User doesnt have enough coin to gacha');
        }
        await this.transactionService.createNewTransaction(
            user._id,
            SYSTEM_ACCOUNT_ID,
            GACHA_COST,
            `Transfer ${GACHA_COST}coin to gacha`,
        );
        const name = this.getRandomItemWithRare(gachaRarity);
        const item = await this.sendItemGIC(
            this.createGicRewardItem(userId, name),
        );
        this.gicAchievementService.singleGacha(
            userId,
            gicItems.find((x) => x.name === name),
        );
        return item;
    }

    async gachaPack(userId: Types.ObjectId) {
        const user = await this.userService.findById(userId);
        if (user.balance < GACHA_COST_PACK) {
            throw Error('User doesnt have enough coin to gacha');
        }
        await this.transactionService.createNewTransaction(
            user._id,
            SYSTEM_ACCOUNT_ID,
            GACHA_COST_PACK,
            `Transfer ${GACHA_COST_PACK}coin to x10 gacha`,
        );
        let items: ItemDocument[] = [];
        let itemsForAchievement: GicItem[] = [];
        for (let i = 0; i < 10; i++) {
            const name = this.getRandomItemWithRare(gachaRarity);
            items.push(
                await this.sendItemGIC(this.createGicRewardItem(userId, name)),
            );
            itemsForAchievement.push(gicItems.find((x) => x.name === name));
        }
        this.gicAchievementService.packGacha(userId, itemsForAchievement);

        return items;
    }

    async premiumGacha(userId: Types.ObjectId) {
        const user = await this.userService.findById(userId);
        if (user.balance < PREMIUM_GACHA_COST) {
            throw Error('User doesnt have enough coin to gacha');
        }
        await this.transactionService.createNewTransaction(
            user._id,
            SYSTEM_ACCOUNT_ID,
            GACHA_COST,
            `Transfer ${GACHA_COST}coin to premium gacha`,
        );
        const name = this.getRandomItemWithRare(premiumGachaRarity);
        const item = await this.sendItemGIC(
            this.createGicRewardItem(userId, name),
        );
        this.gicAchievementService.singlePremiumGacha(
            userId,
            gicItems.find((x) => x.name === name),
        );
        return item;
    }

    async premiumGachaPack(userId: Types.ObjectId) {
        const user = await this.userService.findById(userId);
        if (user.balance < PREMIUM_GACHA_COST_PACK) {
            throw Error('User doesnt have enough coin to gacha');
        }
        await this.transactionService.createNewTransaction(
            user._id,
            SYSTEM_ACCOUNT_ID,
            PREMIUM_GACHA_COST_PACK,
            `Transfer ${PREMIUM_GACHA_COST_PACK}coin to x10 premium gacha`,
        );
        let items: ItemDocument[] = [];
        let itemsForAchievement: GicItem[] = [];
        for (let i = 0; i < 10; i++) {
            const name: GicItemName =
                this.getRandomItemWithRare(premiumGachaRarity);
            items.push(
                await this.sendItemGIC(this.createGicRewardItem(userId, name)),
            );
            itemsForAchievement.push(gicItems.find((x) => x.name === name));
        }
        this.gicAchievementService.premiumPackGacha(
            userId,
            itemsForAchievement,
        );

        return items;
    }

    getRandomItemWithRare(rarity: GicRarity): GicItemName {
        const rnd = Math.random() * 100000;

        const percent = rnd / 1000;

        let result: GicRare,
            acc = 0;

        Object.keys(rarity).forEach((key: GicRare) => {
            if (result === undefined && percent > 100 - rarity[key] - acc)
                result = key;
            acc += rarity[key];
        });
        console.log('result', result);

        let item = gicItems[random(58)];
        console.log('first item', item);
        while (item.rare != result) {
            console.log('Random', item, result);
            item = gicItems[random(58)];
        }
        console.log('Return', item);
        return item.name;
    }

    createGicRewardItem(
        userId: Types.ObjectId,
        itemName: GicItemName | GicCombineName,
    ) {
        let item: ItemDocument = {
            ownerId: userId,
            name: itemName,
            imgUrl: `https://firebasestorage.googleapis.com/v0/b/gic-web-dev.appspot.com/o/characterPieces%2F${itemName}.png?alt=media`,
            description: `This is a magical item in GicReward called ${itemName}`,
            currentPrice: 0,
            isReceived: false,
            receivedAt: false,
            receivedNote: '',
            isRequestToReceiveItem: false,
            requestToReceiveItemAt: 0,
            collectionName: 'GicReward',
        } as ItemDocument;
        return item;
    }

    async combineMerch(userId: Types.ObjectId, s: string) {
        const OPTIONS = ['KEYCHAIN', 'CUP', 'FIGURE', 'TOTE', 'FLASK'];

        if (!OPTIONS.includes(s)) {
            throw new Error(
                `Unknown option: ${s}. Available options are: ${OPTIONS}`,
            );
        }

        const allGicItems = (
            await this.itemService.getItemsOfUser(userId)
        ).filter((x) => x.collectionName === 'GicReward');
        const myPiece = allGicItems.filter((x) =>
            itemsName.find((y) => y === x.name),
        );
        const want = `GIC_${s}` as GicCombineName;
        const needed = [`${s}1`, `${s}2`, `${s}3`, `${s}4`];

        if (allGicItems.find((x) => x.name === want)) {
            throw new Error(`You already have this item...`);
        }

        const missing = needed.filter(
            (x) => !myPiece.find((y) => y.name === x),
        );
        if (missing.length > 0) {
            throw new Error(`Missing pieces: ${missing}`);
        }

        await this.itemService.sendItemGIC(
            this.createGicRewardItem(userId, want),
        );
        // delete items that were used to combine
        await Promise.all(
            needed.map((x) =>
                (async () => {
                    await this.itemService.deleteOneGicItemOfUser(userId, x);
                })(),
            ),
        );
        this.socketService.notifyEvent(
            userId.toString(),
            `Bạn đã nhận được vật phẩm '${s}'`,
        );
    }

    async combinePiece(userId: Types.ObjectId, s: string) {
        const OPTIONS = [
            'PROBLEM',
            'SOLUTION',
            'DESIGN',
            'PRESENT',
            '11062023',
            '14062023',
            '17062023',
            '25062023',
            'KEYCHAIN',
            'CUP',
            'FIGURE',
            'TOTE BAG',
            'VACUUM FLASK',
            'IDEA BOARD',
            'INVITE FRIEND',
            'BAEMIN TECH',
            'GDSC IDEA CONTEST 2023',
            'GOOGLE DEVELOPER STUDENT CLUB HCMUT',
        ];
        if (!OPTIONS.includes(s)) {
            throw new Error(
                `Unknown option: ${s}. Available options are: ${OPTIONS}`,
            );
        }

        const allGicItems = (
            await this.itemService.getItemsOfUser(userId)
        ).filter((x) => x.collectionName === 'GicReward');
        const myPiece = allGicItems.filter((x) =>
            itemsName.find((y) => y === x.name),
        );
        const need = new Map<string, number>();
        s.split('')
            .filter((x) => x !== ' ')
            .forEach((x) => {
                need.get(x) != undefined
                    ? need.set(x, 1)
                    : need.set(x, need.get(x) + 1);
            });

        const have = new Map<string, number>();
        myPiece.forEach((x) => {
            have.get(x.name) != undefined
                ? have.set(x.name, 1)
                : have.set(x.name, have.get(x.name) + 1);
        });

        for (const [k, v] of need) {
            if (have.get(k) == undefined || have.get(k) < v) {
                throw new Error(`Not enough pieces`);
            }
        }

        this.gicAchievementService.combinePieces(userId, s);
    }

    // voting
    async voteTeam(userId: Types.ObjectId, ideaId: Types.ObjectId) {
        if (TEAMS_TO_VOTE.every((x) => !x.equals(ideaId))) {
            throw new Error(`Cannot vote for this team`);
        }
        return await this.voteLock.acquire(userId.toString(), async () => {
            const [
                userNotCheckin,
                teamNotExist,
                userAlreadyVoted,
                voteMaxLimit,
            ] = await Promise.all([
                // if the user hasn't check in
                (async () =>
                    (await DayRegModel.findOne({
                        registeredBy: userId,
                        day: 5,
                        status: DayRegStatus.CHECKIN,
                    })) == undefined)(),
                // if the requested team does not exist
                (async () =>
                    (await GICContestRegModel.findOne({
                        _id: ideaId,
                        status: ContestRegStatus.REGISTERED,
                    })) == undefined)(),
                // if the user has voted for this team before
                (async () =>
                    (await GICVoteModel.findOne({
                        userId: userId,
                        ideaId: ideaId,
                        status: GICVoteStatus.ACTIVE,
                    })) != undefined)(),
                // if the user has voted for three teams already
                (async () =>
                    (await GICVoteModel.count({
                        userId: userId,
                        status: GICVoteStatus.ACTIVE,
                    })) == 3)(),
            ]);

            if (userNotCheckin) {
                throw new Error(`Please checkin before voting`);
            }
            if (teamNotExist) {
                throw new Error(`The requested idea does not exist`);
            }
            if (userAlreadyVoted) {
                throw new Error(`You have already voted for this team`);
            }
            if (voteMaxLimit) {
                throw new Error(
                    `You have voted for three teams already, please undo your votes to vote for this team`,
                );
            }
            this.socketService.notifyVoted(userId.toString());
            return await GICVoteModel.create({
                userId: userId,
                ideaId: ideaId,
                votedAt: Date.now(),
                status: GICVoteStatus.ACTIVE,
            });
        });
    }

    async unvoteTeam(userId: Types.ObjectId, ideaId: Types.ObjectId) {
        if (TEAMS_TO_VOTE.every((x) => !x.equals(ideaId))) {
            throw new Error(`Cannot vote for this team`);
        }
        return await this.voteLock.acquire(userId.toString(), async () => {
            const [teamNotExist, userHasNotVoted] = await Promise.all([
                // if the requested team does not exist
                (async () =>
                    (await GICContestRegModel.findOne({
                        _id: ideaId,
                        status: ContestRegStatus.REGISTERED,
                    })) == undefined)(),
                // if the user has not voted for this team before
                (async () =>
                    (await GICVoteModel.findOne({
                        userId: userId,
                        ideaId: ideaId,
                        status: GICVoteStatus.ACTIVE,
                    })) == undefined)(),
            ]);
            if (teamNotExist) {
                throw new Error(`The requested team is not found`);
            }
            if (userHasNotVoted) {
                throw new Error(`You have not voted for this team yet`);
            }
            this.socketService.notifyVoted(userId.toString());
            return await GICVoteModel.findOneAndUpdate(
                {
                    userId: userId,
                    ideaId: ideaId,
                    status: GICVoteStatus.ACTIVE,
                },
                { status: GICVoteStatus.CANCELLED },
                { new: true },
            );
        });
    }

    async allVotesBy(userId: Types.ObjectId) {
        return await this.voteLock.acquire(userId.toString(), async () => {
            return await GICVoteModel.find({
                userId: userId,
                status: GICVoteStatus.ACTIVE,
            }).populate('ideaId');
        });
    }

    async allIdeas() {
        return await GICContestRegModel.find({
            status: ContestRegStatus.REGISTERED,
        });
    }

    async getTopVotedTeams() {
        return await GICVoteModel.aggregate([
            {
                $match: {
                    status: GICVoteStatus.ACTIVE,
                },
            },
            {
                $lookup: {
                    from: 'gic_contest_regs',
                    localField: 'ideaId',
                    foreignField: '_id',
                    as: 'idea',
                },
            },
            {
                $unwind: { path: '$idea' },
            },
            {
                $group: {
                    _id: '$ideaId',
                    ideaName: { $first: '$idea.ideaName' },
                    voteCount: { $count: {} },
                },
            },
            {
                $sort: {
                    voteCount: -1,
                },
            },
        ]);
    }

    async getGameGiftsOfUser(userId: Types.ObjectId) {
        return (await this.itemService.getItemsOfUser(userId)).filter(
            (x) =>
                x.collectionName === 'GicReward' && x.name.startsWith('GIC_'),
        );
    }

    async receiveGameGift(itemId: Types.ObjectId) {
        const gift = await this.itemService.findOne({ _id: itemId });
        if (!gift) {
            throw new Error(`The requested gift does not exist`);
        }
        const giftName = gift.name;
        const giftOwner = gift.ownerId;
        const [itemIsNotGift, hasItemWithSameName] = await Promise.all([
            // if the item is not a gift (doesn't start with 'GIC_')
            (async () => {
                return !giftName.startsWith('GIC_');
            })(),
            // check if another item with the same name has already been received (due to a known bug)
            (async () => {
                return (
                    (await this.itemService.findOne({
                        ownerId: giftOwner,
                        name: gift.name,
                        isReceived: true,
                    })) != undefined
                );
            })(),
        ]);
        if (itemIsNotGift) {
            throw new Error(`The requested item is not a game gift`);
        }
        if (hasItemWithSameName) {
            throw new Error(`You have already obtained a similar item`);
        }
        return this.itemService.findOneAndUpdate(
            { _id: itemId },
            { isReceived: true },
            { new: true },
        );
    }

    async getAllEventEmails() {
        // all unique people that participated in the event
        const [eventParticipants, contestParticipants] = await Promise.all([
            (async () => {
                const result = await DayRegModel.find({
                    status: DayRegStatus.REGISTERED,
                }).populate('registeredBy');
                return result.map((x) => ({
                    name: (x.registeredBy as any).name as string,
                    email: (x.registeredBy as any).email as string,
                }));
            })(),
            (async () => {
                const query = await GICContestRegModel.find({
                    status: { $ne: ContestRegStatus.CANCELLED },
                });
                const ans: {
                    name: string;
                    email: string;
                }[] = [];
                query.forEach((team) => {
                    team.members.forEach((mem) => {
                        ans.push({
                            name: mem.name,
                            email: mem.email,
                        });
                    });
                });
                return ans;
            })(),
        ]);
        let ans: {
            name: string;
            email: string;
        }[] = [];
        const participants = eventParticipants.concat(contestParticipants);
        participants.forEach((participant) => {
            if (!ans.find((x) => x.email === participant.email)) {
                ans.push(participant);
            }
        });
        return ans;
    }
}
