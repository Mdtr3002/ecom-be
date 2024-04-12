import { injectable, inject } from 'inversify';
import { Controller } from './controller';
import { Router } from 'express';
import { Request, Response, ServiceType } from '../types';
import { AuthService, UserService } from '../services';
import { fileUploader } from '../upload-storage';
import { Types } from 'mongoose';
import { GICService } from '../services/gic/gic.service';
import { NoFileCompression } from '../lib/file-compression/strategies';
import { ContestRegStatus } from '../models/gic/contest_registration.model';
import { DayRegStatus } from '../models/gic/day_registration.model';
import { UploadValidator } from '../lib/upload-validator/upload-validator';
import { UploadIdeaDescriptionValidation } from '../lib/upload-validator/upload-validator-strategies';
import { MailService } from '../services/mail.service';
import { USER_ROLES } from '../models/user.model';
// import { FileUploadService } from '../services/file-upload.service';
import { GICAchievementService } from '../services/gic/gic_achievement.service';
import { PassThrough } from 'stream';
import QRCode from 'qrcode';
import {
    CONTEST_CONFIRMATION_EMAIL,
    CONTEST_REGISTRATION_SUCCESSFUL_EMAIL,
    DAY_1_3_REGISTRATION_SUCCESSFUL_EMAIL,
    DAY_5_REGISTRATION_SUCCESSFUL_EMAIL,
    IDEA_SHOWCASE_1_DAY_REMINDER_EMAIL,
    SEMINAR_1_30_MINUTE_REMINDER_EMAIL,
    SEMINAR_2_1_DAY_REMINDER_EMAIL,
    SEMINAR_2_3O_MINUTE_REMINDER_EMAIL,
    THANK_YOU_EMAIL,
} from '../constant';
import * as crypto from 'crypto';
import { IS_PRODUCTION } from '../config';
import { TokenDocument } from '../models/token.model';
import _ from 'lodash';
import { scheduleJob } from 'node-schedule';
import { UserAuth } from '../typings/express';

const ENCRYPTION_KEY = 'abqheuqo$5llamcb13%p78p#l4Bn561#';
const ENCRYPTION_IV = '5183666c72eec9e4';

const EVENT_DATE_LIST = ['11/06', '14/06', '17/06'];

const EVENT_NAME_LIST = [
    'GIC Opening Day',
    'Seminar 1: Designing Your Idea',
    'Seminar 2: Presenting Your Idea',
];
const EVENT_TIME_LIST = [
    'Online 09:00 - 12:25',
    'Online 19:00 - 21:15',
    'Online 09:00 - 11:30',
];
const EVENT_DESCRIPTION_LIST = [
    'Nội dung, giải thưởng cũng như mục tiêu của cuộc thi sẽ được phổ biến cho các thí sinh. Ngoài ra, sự kiện còn đem đến cho mọi người chuyên mục “Fireside chat”, một hoạt động trò chuyện, đặt câu hỏi và lắng nghe những chia sẻ từ diễn giả về việc thiết kế, phát triển các giải pháp thiết thực.',
    'Các bạn tham dự sẽ được bật mí về những yêu cầu đối với giải pháp, những tiêu chí quan trọng sẽ được giám khảo xem xét. Bên cạnh đó, diễn giả từ Baemin sẽ chia sẻ về những kỹ năng, kinh nghiệm trong việc thiết kế nên những giải pháp thiết thực.',
    'Những kỹ năng cần thiết để trình bày ý tưởng và chuyên nghiệp hoá sản phẩm như phong thái, nội dung khi thuyết trình, cách thiết kế slide... sẽ là những kiến thức, kĩ năng mà các bạn sẽ được trau dồi từ hoạt động seminar.',
];

const aes256_encrypt = (val: string) => {
    let cipher = crypto.createCipheriv(
        'aes-256-cbc',
        ENCRYPTION_KEY,
        ENCRYPTION_IV,
    );
    let encrypted = cipher.update(val, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
};

const aes256_decrypt = (encrypted: string) => {
    let decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        ENCRYPTION_KEY,
        ENCRYPTION_IV,
    );
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return decrypted + decipher.final('utf8');
};

function blockIfLaterThan(
    x: number,
    m: string = `This action has been disabled`,
) {
    if (Date.now() > x) {
        throw new Error(m);
    }
}

enum GIC_TIMESTAMPS {
    DAY_1_START = 1686447000000,
    DAY_1_END = 1686457500000,
    DAY_2_START = 1686742200000,
    DAY_2_END = 1686752100000,
    DAY_3_START = 1686965400000,
    DAY_3_END = 1686976200000,
    DAY_5_START = 1687654800000,
    DAY_5_END = 1687670100000,
    IDEA_SUBMISSION_DEADLINE = 1687093200000,
}

@injectable()
export class GICController extends Controller {
    public readonly router = Router();
    public readonly path = '/gic';

    constructor(
        @inject(ServiceType.Auth) private authService: AuthService,
        @inject(ServiceType.GIC) private gicService: GICService,
        @inject(ServiceType.User) private userService: UserService,
        @inject(ServiceType.Mail) private mailService: MailService,
        // @inject(ServiceType.FileUpload)
        // private fileUploadService: FileUploadService,
        @inject(ServiceType.GICAchievement)
        private gicAchievementService: GICAchievementService,
    ) {
        super();

        this.router.get(`/qr`, this.getQrCode.bind(this));
        this.router.post(`/contest/confirm`, this.confirmContest.bind(this));

        this.router.all('*', this.authService.authenticate());

        this.router.get(`/allmail`, this.getAllMail.bind(this));
        this.router.get(`/myqr`, this.getMyQr.bind(this));
        this.router.post(`/checkin`, this.checkin.bind(this));
        this.router.get(`/allcheckin`, this.getAllCheckin.bind(this));
        this.router.get(`/gicgift`, this.getGicGift.bind(this));
        this.router.get(`/allgicgift`, this.getAllUserGicGift.bind(this));
        this.router.get(`/user/gicgift`, this.getUserGicGift.bind(this));
        this.router.post(`/gicgift/:giftId`, this.receiveGicGift.bind(this));

        this.router.get(`/achievements/my`, this.getMyAchievements.bind(this));
        this.router.get(
            `/achievements/unread`,
            this.getViewedAchievements.bind(this),
        );
        this.router.post(
            `/achievements/mark-as-read`,
            this.viewAchievement.bind(this),
        );

        // this.router.post(
        //     `/contest/register`,
        //     authService.authenticate(),
        //     fileUploader.any(),
        //     this.registerContest.bind(this),
        // );
        this.router.post(
            `/contest/unregister`,
            authService.authenticate(),
            this.unregisterContest.bind(this),
        );
        this.router.get(
            `/contest/myregistration`,
            this.getRegisteredContest.bind(this),
        );
        // this.router.get(
        //     `/contest/download`,
        //     this.downloadIdeaDescription.bind(this),
        // );
        this.router.get(
            `/contest/allregistrations`,
            this.getAllContestRegistrations.bind(this),
        );
        this.router.get(
            `/contest/allregistrations/:registrationId`,
            this.getContestRegistrations.bind(this),
        );
        // this.router.get(
        //     `/contest/downloadadmin/:registrationId`,
        //     this.downloadIdeaAdmin.bind(this),
        // );

        this.router.post('/day/register/:day', this.registerDay.bind(this));
        this.router.post('/day/unregister/:day', this.unregisterDay.bind(this));
        this.router.get(
            `/day/myregistration`,
            this.getRegisteredDays.bind(this),
        );
        this.router.get(
            `/day/get/:registrationId`,
            this.getDayRegistrationById.bind(this),
        );
        this.router.get(
            `/day/invitedbyme`,
            this.getPeopleUserInvited.bind(this),
        );
        this.router.get(
            `/day/allregistrations/:day`,
            this.getAllDayRegistrations.bind(this),
        );

        this.router.post(`/gacha`, this.gacha.bind(this));
        this.router.post(`/gachapack`, this.gachaPack.bind(this));

        this.router.post(`/premiumgacha`, this.premiumGacha.bind(this));
        this.router.post(`/premiumgachapack`, this.premiumGachaPack.bind(this));
        this.router.post(`/achievement`, this.acquireAchievement.bind(this));

        // combine merch and piece
        this.router.post(`/combine/merch`, this.combineMerch.bind(this));
        this.router.post(`/combine/piece`, this.combinePiece.bind(this));
        this.router.post(
            `/add_discord_achievement/`,
            this.addDiscordAchievement.bind(this),
        );

        // game gifts and idea board gifts
        this.router.post(
            `/admin_get_game_gifts`,
            this.getGameGiftOfUser.bind(this),
        );
        this.router.post(
            `/admin_receive_game_gifts`,
            this.receiveGameGift.bind(this),
        );
        this.router.post(
            `/admin_get_idea_board_id`,
            this.getIdeaBoardId.bind(this),
        );
        this.router.post(
            `/admin_get_qr_by_email`,
            this.getQrByEmail.bind(this),
        );

        // schedule sending emails
        scheduleJob(
            '0 0 18 14 6 *',
            this.send30MinutesReminderSeminar1.bind(this),
        );
        scheduleJob('0 15 16 16 6 *', this.send1DayReminderSeminar2.bind(this));
        scheduleJob(
            '0 0 8 17 6 *',
            this.send30MinutesReminderSeminar2.bind(this),
        );
        scheduleJob(
            '0 40 19 24 6 *',
            this.send1DayReminderIdeaShowcase.bind(this),
        );
        scheduleJob('0 15 14 28 6 *', this.sendThankYouEmail.bind(this));

        // voting
        this.router.post('/contest/vote/:ideaId', this.voteTeam.bind(this));
        this.router.post('/contest/unvote/:ideaId', this.unvoteTeam.bind(this));
        this.router.get('/contest/myvotes', this.myVotes.bind(this));
        this.router.get('/contest/allideas', this.allIdeas.bind(this));
        this.router.get('/contest/leaderboard', this.getLeaderboard.bind(this));
    }

    async sendThankYouEmail() {
        const a = await this.gicService.getAllEventEmails();
        await Promise.all(
            a.map((u) =>
                (async () => {
                    const { name, email } = u;
                    try {
                        console.log(`Sending thank you to email: ${email}`);
                        await this.mailService.sendToOne(
                            email,
                            `[GDSC Idea Contest 2023] Cảm ơn bạn đã tham gia sự kiện`,
                            THANK_YOU_EMAIL(name),
                        );
                    } catch (err) {
                        console.log(
                            `Sending thank you to email: ${email} failed ${err.message}`,
                        );
                    }
                })(),
            ),
        );
    }

    async send1DayReminderIdeaShowcase() {
        const a = await Promise.all(
            (
                await this.gicService.findDayRegistrations({
                    status: DayRegStatus.REGISTERED,
                    day: 5,
                })
            ).map((r) => (async () => r.populate('registeredBy'))()),
        );
        await Promise.all(
            a.map((u) =>
                (async () => {
                    const name = (u.registeredBy as any).name as string;
                    const email = (u.registeredBy as any).email as string;
                    try {
                        console.log(
                            `Sending Idea Showcase reminder (1 day) to email: ${email}`,
                        );
                        await this.mailService.sendToOne(
                            email,
                            `[GDSC Idea Contest 2023] Còn 1 ngày nữa đến sự kiện 'Idea Showcase'`,
                            IDEA_SHOWCASE_1_DAY_REMINDER_EMAIL(name),
                        );
                    } catch (err) {
                        console.log(
                            `Sending Idea Showcase reminder (1 day) to email: ${email} failed ${err.message}`,
                        );
                    }
                })(),
            ),
        );
    }

    async getQrByEmail(req: Request, res: Response) {
        try {
            const userRoles = req.tokenMeta.roles;
            if (!userRoles.includes(USER_ROLES.GIC_ADMIN)) {
                throw new Error(`Missing admin permission`);
            }
            const { email } = req.body;
            const user = await this.userService.findOne({ email: email });
            if (!user) {
                throw new Error(`User with the specified email doesn't exist`);
            }
            const result = aes256_encrypt(
                JSON.stringify({ userId: user._id.toString() }),
            );
            res.composer.success(result);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getIdeaBoardId(req: Request, res: Response) {
        try {
            const userRoles = req.tokenMeta.roles;
            if (!userRoles.includes(USER_ROLES.GIC_ADMIN)) {
                throw new Error(`Missing admin permission`);
            }
            const { qrCode } = req.body;
            const data = JSON.parse(aes256_decrypt(qrCode as string));
            const userId = new Types.ObjectId(data.userId);
            const reg = await this.gicService.findOneDayRegistration({
                registeredBy: userId,
                status: 'CHECKIN',
            });
            if (!reg) {
                throw new Error(`User hasn't checked in yet`);
            }
            if (reg.ideaBoardId === undefined) {
                throw new Error(
                    `This is probably an old document, which doesn't have idea board id on registration document`,
                );
            }
            res.composer.success(reg.ideaBoardId);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getGameGiftOfUser(req: Request, res: Response) {
        try {
            const userRoles = req.tokenMeta.roles;
            if (!userRoles.includes(USER_ROLES.GIC_ADMIN)) {
                throw new Error(`Missing admin permission`);
            }
            const { qrCode } = req.body;
            const data = JSON.parse(aes256_decrypt(qrCode as string));
            const userId = new Types.ObjectId(data.userId);
            const result = await this.gicService.getGameGiftsOfUser(userId);
            res.composer.success(result);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async receiveGameGift(req: Request, res: Response) {
        try {
            const userRoles = req.tokenMeta.roles;
            if (!userRoles.includes(USER_ROLES.GIC_ADMIN)) {
                throw new Error(`Missing admin permission`);
            }
            const itemId = new Types.ObjectId(req.body.itemId);
            const result = await this.gicService.receiveGameGift(itemId);
            res.composer.success(result);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getLeaderboard(req: Request, res: Response) {
        try {
            const result = await this.gicService.getTopVotedTeams();
            res.composer.success(result);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async voteTeam(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const ideaId = new Types.ObjectId(req.params.ideaId);
            const result = await this.gicService.voteTeam(userId, ideaId);
            res.composer.success(result);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async unvoteTeam(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const ideaId = new Types.ObjectId(req.params.ideaId);
            const result = await this.gicService.unvoteTeam(userId, ideaId);
            res.composer.success(result);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async myVotes(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const result = await this.gicService.allVotesBy(userId);
            res.composer.success(result);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async allIdeas(req: Request, res: Response) {
        try {
            const result = (await this.gicService.allIdeas()) as any;
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result[i].members.length; j++) {
                    result[i].members[j] = _.pick(result[i].members[j], [
                        'name',
                        'school',
                        'major',
                    ]);
                }
            }
            res.composer.success(result);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    // job scheduling
    async send30MinutesReminderSeminar1() {
        const a = await Promise.all(
            (
                await this.gicService.findDayRegistrations({
                    status: DayRegStatus.REGISTERED,
                    day: 2,
                })
            ).map((r) => (async () => r.populate('registeredBy'))()),
        );
        await Promise.all(
            a.map((u) =>
                (async () => {
                    const name = (u.registeredBy as any).name as string;
                    const email = (u.registeredBy as any).email as string;
                    try {
                        console.log(
                            `Sending seminar 1 reminder (30 minutes) to email: ${email}`,
                        );
                        await this.mailService.sendToOne(
                            email,
                            `[GDSC Idea Contest 2023] Còn 30 phút nữa đến sự kiện '${EVENT_NAME_LIST[1]}'`,
                            SEMINAR_1_30_MINUTE_REMINDER_EMAIL(name),
                        );
                    } catch (err) {
                        console.log(
                            `Sending seminar 1 reminder (30 minutes) to email: ${email} failed ${err.message}`,
                        );
                    }
                })(),
            ),
        );
    }

    async send1DayReminderSeminar2() {
        const a = await Promise.all(
            (
                await this.gicService.findDayRegistrations({
                    status: DayRegStatus.REGISTERED,
                    day: 3,
                })
            ).map((r) => (async () => r.populate('registeredBy'))()),
        );
        await Promise.all(
            a.map((u) =>
                (async () => {
                    const name = (u.registeredBy as any).name as string;
                    const email = (u.registeredBy as any).email as string;
                    try {
                        console.log(
                            `Sending seminar 2 reminder (1 day) to email: ${email}`,
                        );
                        await this.mailService.sendToOne(
                            email,
                            `[GDSC Idea Contest 2023] Còn 1 ngày nữa đến sự kiện '${EVENT_NAME_LIST[2]}'`,
                            SEMINAR_2_1_DAY_REMINDER_EMAIL(name),
                        );
                    } catch (err) {
                        console.log(
                            `Sending seminar 2 reminder (1 day) to email: ${email} failed ${err.message}`,
                        );
                    }
                })(),
            ),
        );
    }

    async send30MinutesReminderSeminar2() {
        const a = await Promise.all(
            (
                await this.gicService.findDayRegistrations({
                    status: DayRegStatus.REGISTERED,
                    day: 3,
                })
            ).map((r) => (async () => r.populate('registeredBy'))()),
        );
        await Promise.all(
            a.map((u) =>
                (async () => {
                    const name = (u.registeredBy as any).name as string;
                    const email = (u.registeredBy as any).email as string;
                    try {
                        console.log(
                            `Sending seminar 2 reminder (30 minutes) to email: ${email}`,
                        );
                        await this.mailService.sendToOne(
                            email,
                            `[GDSC Idea Contest 2023] Còn 30 phút nữa đến sự kiện '${EVENT_NAME_LIST[2]}'`,
                            SEMINAR_2_3O_MINUTE_REMINDER_EMAIL(name),
                        );
                    } catch (err) {
                        console.log(
                            `Sending seminar 2 reminder (30 minutes) to email: ${email} failed ${err.message}`,
                        );
                    }
                })(),
            ),
        );
    }

    async addDiscordAchievement(req: Request, res: Response) {
        try {
            const roles = req.tokenMeta.roles;
            if (!roles.includes(USER_ROLES.GIC_ADMIN)) {
                throw new Error('Permission denied');
            }

            const discordId = req.body.discordId as string;
            const achievementId = parseInt(req.body.achievementId);
            const u = await this.userService.findUserWithDiscordId(discordId);
            if (!u) {
                throw new Error(`No user with Discord Id ${discordId}`);
            }

            this.gicAchievementService.addDiscordAchievement(
                u._id,
                achievementId,
            );
            res.composer.success({});
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async combineMerch(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const s = req.body.item as string;
            await this.gicService.combineMerch(userId, s);
            res.composer.success({});
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async combinePiece(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const s = req.body.item as string;
            await this.gicService.combinePiece(userId, s);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async viewAchievement(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            if (!req.body.achievementNumber) {
                throw Error('Missing acheivementNumber in req.body');
            }
            await this.gicAchievementService.viewAcheivement(
                userId,
                req.body.achievementNumber,
            );
            res.composer.success(null);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getViewedAchievements(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const d =
                await this.gicAchievementService.getViewedAchievementOfUser(
                    userId,
                );
            res.composer.success(d != null ? d : []);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getMyAchievements(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const d = await this.gicAchievementService.getAchievementOfUser(
                userId,
            );
            res.composer.success(d ? d : []);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getAllMail(req: Request, res: Response) {
        try {
            const userRoles = req.tokenMeta.roles;
            if (!userRoles.includes(USER_ROLES.GIC_ADMIN)) {
                throw new Error(`You don't have permission to view this`);
            }

            const result = await this.mailService.getAllMail();
            res.composer.success(result);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getQrCode(req: Request, res: Response) {
        try {
            const content = req.query.content as string;
            const qrStream = new PassThrough();
            const result = await QRCode.toFileStream(qrStream, content, {
                type: 'png',
                width: 400,
                margin: 0,
                errorCorrectionLevel: 'H',
            });
            qrStream.pipe(res);
        } catch (err) {
            console.log(err);
        }
    }

    async getMyQr(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const data = { userId: userId.toString() };
            const encoded = aes256_encrypt(JSON.stringify(data));
            res.composer.success(encoded);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async checkin(req: Request, res: Response) {
        try {
            let { roles } = req.tokenMeta as UserAuth;

            if (!_.includes(roles, USER_ROLES.GIC_ADMIN)) {
                throw Error('Permission Error');
            }
            if (!req.body.qrcode) {
                throw Error('Missing QrCode');
            }
            const decodedData = JSON.parse(aes256_decrypt(req.body.qrcode));
            if (!decodedData.userId) {
                throw Error('QrCode not valid');
            }
            const check = await this.gicService.checkin(
                new Types.ObjectId(decodedData.userId as string),
            );
            res.composer.success(check);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getGicGift(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const gifts = await this.gicService.findAllUserGicGift(userId);
            res.composer.success(gifts);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getUserGicGift(req: Request, res: Response) {
        try {
            let { roles } = req.tokenMeta as UserAuth;

            if (!_.includes(roles, USER_ROLES.GIC_ADMIN)) {
                throw Error('Permission Error');
            }
            if (!req.query.qrcode) {
                throw Error('Missing QrCode');
            }
            const decodedData = JSON.parse(
                aes256_decrypt(req.query.qrcode as string),
            );
            if (!decodedData.userId) {
                throw Error('QrCode not valid');
            }
            const userId = new Types.ObjectId(decodedData.userId);

            const gifts = await this.gicService.findAllUserGicGift(userId);

            res.composer.success(gifts);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getAllUserGicGift(req: Request, res: Response) {
        try {
            let { roles } = req.tokenMeta as UserAuth;

            if (!_.includes(roles, USER_ROLES.GIC_ADMIN)) {
                throw Error('Permission Error');
            }

            const gifts = await this.gicService.findAllGicGift();

            res.composer.success(gifts);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async receiveGicGift(req: Request, res: Response) {
        try {
            const userRoles = req.tokenMeta.roles;
            if (!userRoles.includes(USER_ROLES.GIC_ADMIN)) {
                throw new Error(`You don't have permission`);
            }

            const gifts = await this.gicService.receiveGicGift(
                new Types.ObjectId(req.params.giftId),
            );

            res.composer.success(gifts);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getAllCheckin(req: Request, res: Response) {
        try {
            let { roles } = req.tokenMeta as UserAuth;

            if (!_.includes(roles, USER_ROLES.GIC_ADMIN)) {
                throw Error('Permission Error');
            }
            const checkins = await this.gicService.findAllCheckin();

            res.composer.success(checkins);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getAllContestRegistrations(req: Request, res: Response) {
        try {
            const userRoles = req.tokenMeta.roles;
            if (!userRoles.includes(USER_ROLES.GIC_ADMIN)) {
                throw new Error(`You don't have permission`);
            }
            const result = await Promise.all(
                (
                    await this.gicService.findContestRegs()
                ).map((r) => (async () => await r.populate('registeredBy'))()),
            );
            let responses = result.filter(
                (e) => e.status === ContestRegStatus.REGISTERED,
            );
            res.composer.success(responses);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getContestRegistrations(req: Request, res: Response) {
        try {
            const userRoles = req.tokenMeta.roles;
            if (!userRoles.includes(USER_ROLES.GIC_ADMIN)) {
                throw new Error(`You don't have permission`);
            }

            const regId = new Types.ObjectId(req.params.registrationId);
            const reg = await this.gicService.findContestRegByIdPopulate(regId);
            if (!reg) {
                throw new Error(`Registration doesn't exist`);
            }
            res.composer.success(reg);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    // async downloadIdeaAdmin(req: Request, res: Response) {
    //     try {
    //         const userRoles = req.tokenMeta.roles;
    //         if (!userRoles.includes(USER_ROLES.GIC_ADMIN)) {
    //             throw new Error(`You don't have permission`);
    //         }

    //         const regId = new Types.ObjectId(req.params.registrationId);
    //         const reg = await this.gicService.findContestRegById(regId);
    //         if (!reg) {
    //             throw new Error(`Registration doesn't exist`);
    //         }

    //         const file = await this.fileUploadService.downloadFile(
    //             reg.ideaDescription,
    //         );
    //         res.setHeader(
    //             'Content-Disposition',
    //             `attachment; filename=${file.originalName}`,
    //         );
    //         res.setHeader('Content-Type', `${file.mimetype}`);
    //         res.end(file.buffer);
    //     } catch (error) {
    //         console.log(error);
    //         res.composer.badRequest(error.message);
    //     }
    // }

    async getAllDayRegistrations(req: Request, res: Response) {
        try {
            const userRoles = req.tokenMeta.roles;
            if (!userRoles.includes(USER_ROLES.GIC_ADMIN)) {
                throw new Error(`You don't have permission`);
            }
            const day = parseInt(req.params.day);
            const queryResult = await Promise.all(
                (
                    await this.gicService.findDayRegistrations({
                        day: day,
                        status: DayRegStatus.REGISTERED,
                    })
                ).map((r) => (async () => await r.populate('registeredBy'))()),
            );
            const result = queryResult.map((x) => ({
                name: (x.registeredBy as any).name,
                email: (x.registeredBy as any).email,
            }));
            res.composer.success({
                numberOfRegistrations: result.length,
                registrations: result,
            });
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    // API'S FOR CONTEST

    // async registerContest(req: Request, res: Response) {
    //     try {
    //         blockIfLaterThan(GIC_TIMESTAMPS.IDEA_SUBMISSION_DEADLINE);

    //         const userId = new Types.ObjectId(req.tokenMeta.userId);

    //         // block spamming
    //         if (IS_PRODUCTION) {
    //             await this.gicService.rateLimitOnContestRegistration(userId);
    //         }

    //         const user = await this.userService.findById(userId);
    //         const members = JSON.parse(req.body.members) as any[];
    //         const { ideaName } = req.body;
    //         if (!ideaName) {
    //             throw new Error(`Idea name is missing`);
    //         }
    //         if (!members) {
    //             throw new Error(`Missing members field`);
    //         }
    //         if (members.length > 3) {
    //             throw new Error(`A team can consist of at most 3 people`);
    //         }

    //         let selfPresent = false;
    //         for (const [i, mem] of members.entries()) {
    //             if (!mem[`name`])
    //                 throw new Error(`Member ${i + 1} missing fullname`);
    //             if (!mem[`email`])
    //                 throw new Error(`Member ${i + 1} missing email`);
    //             if (!mem[`school`])
    //                 throw new Error(`Member ${i + 1} missing school`);
    //             if (!mem[`major`])
    //                 throw new Error(`Member ${i + 1} missing major`);
    //             mem[`confirmed`] = mem.email === user.email;
    //             selfPresent = selfPresent || mem[`confirmed`];
    //         }

    //         // all emails must be unique
    //         if (new Set(members.map((x) => x.email)).size != members.length) {
    //             throw new Error(`Given emails are not unique`);
    //         }

    //         if (!selfPresent) {
    //             throw new Error(`Team doesn't contain yourself`);
    //         }

    //         new UploadValidator(new UploadIdeaDescriptionValidation()).validate(
    //             req.files as Express.Multer.File[],
    //         );

    //         // check if any users are already in a contest, or the person registering
    //         // has registered another idea
    //         await Promise.all(
    //             members.map((mem) =>
    //                 (async () => {
    //                     if (await this.gicService.emailHasTeam(mem.email)) {
    //                         throw new Error(
    //                             `A user on your team already has a team`,
    //                         );
    //                     }
    //                     if (
    //                         mem.email === user.email &&
    //                         (await this.gicService.userHasRegisteredContest(
    //                             userId,
    //                         ))
    //                     ) {
    //                         throw new Error(
    //                             `You have already registered your idea`,
    //                         );
    //                     }
    //                 })(),
    //             ),
    //         );

    //         const result = await this.gicService.registerContest(
    //             userId,
    //             ideaName,
    //             members,
    //             req.files as Express.Multer.File[],
    //             new NoFileCompression(),
    //         );

    //         // TODO: send confirmation email, different for the person who registered and others
    //         for (const m of members) {
    //             if (m.confirmed) {
    //                 this.mailService.sendToOne(
    //                     m.email,
    //                     '[GDSC Idea Contest 2023] Đăng ký dự thi thành công',
    //                     CONTEST_REGISTRATION_SUCCESSFUL_EMAIL(m.name, ideaName),
    //                 );
    //             } else {
    //                 this.mailService.sendToOne(
    //                     m.email,
    //                     '[GDSC Idea Contest 2023] Xác nhận đăng ký tham gia dự thi',
    //                     CONTEST_CONFIRMATION_EMAIL(
    //                         m.name,
    //                         ideaName,
    //                         aes256_encrypt(
    //                             JSON.stringify({
    //                                 regId: result._id,
    //                                 email: m.email,
    //                             }),
    //                         ),
    //                     ),
    //                 );
    //             }
    //         }

    //         res.composer.success(result);
    //     } catch (error) {
    //         console.log(error);
    //         res.composer.badRequest(error.message);
    //     }
    // }

    async unregisterContest(req: Request, res: Response) {
        try {
            blockIfLaterThan(GIC_TIMESTAMPS.IDEA_SUBMISSION_DEADLINE);

            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const reg = await this.gicService.findOneContestRegAndUpdate(
                { registeredBy: userId, status: ContestRegStatus.REGISTERED },
                { status: ContestRegStatus.CANCELLED },
            );
            if (!reg) {
                throw new Error(
                    `Contest registration not found, or your team has already checked in`,
                );
            }
            res.composer.success(reg);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getRegisteredContest(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const user = await this.userService.findById(userId);

            const ans = await this.gicService.findCurrentContestRegistration(
                user.email,
            );
            res.composer.success(!ans ? {} : ans);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    // async downloadIdeaDescription(req: Request, res: Response) {
    //     try {
    //         const userId = new Types.ObjectId(req.tokenMeta.userId);
    //         const user = await this.userService.findById(userId);

    //         const reg = await this.gicService.findCurrentContestRegistration(
    //             user.email,
    //         );
    //         if (!reg) {
    //             throw new Error(`Contest registration not found`);
    //         }

    //         const file = await this.fileUploadService.downloadFile(
    //             reg.ideaDescription,
    //         );
    //         res.setHeader(
    //             'Content-Disposition',
    //             `attachment; filename=${file.originalName}`,
    //         );
    //         res.setHeader('Content-Type', `${file.mimetype}`);
    //         res.end(file.buffer);
    //     } catch (error) {
    //         console.log(error);
    //         res.composer.badRequest(error.message);
    //     }
    // }

    async confirmContest(req: Request, res: Response) {
        try {
            if (!req.body.code) {
                throw new Error(`Missing code`);
            }
            const data = JSON.parse(aes256_decrypt(req.body.code));
            if (!data.email || !data.regId) {
                throw new Error(`Invalid confirmation code`);
            }
            const email = data.email as string;
            const regId = new Types.ObjectId(data.regId);
            console.log(`Confirming ${email} ${regId.toString()}`);

            if (await this.gicService.emailHasTeam(email)) {
                throw new Error(`You have already registered to a team`);
            }

            const reg = await this.gicService.findContestRegById(regId);
            if (!reg) {
                throw new Error(`Registration not found`);
            }
            let i = -1;
            for (let j = 0; j < reg.members.length; j++) {
                if (reg.members[j].email === email) {
                    i = j;
                }
            }
            if (i === -1) {
                throw new Error(`You are not in this team`);
            }
            if (reg.members[i].confirmed) {
                throw new Error(`You have already joined this team`);
            }

            reg.members[i].confirmed = true;
            await reg.save();
            res.composer.success(reg);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    // API'S FOR DAY

    async registerDay(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const day = parseInt(req.params.day);
            if (!(1 <= day && day <= 5) || day === 4) {
                throw new Error(`Can only register for days 1, 2, 3 and 5`);
            }

            // block registering after end time
            if (day === 1) blockIfLaterThan(GIC_TIMESTAMPS.DAY_1_END);
            else if (day === 2) blockIfLaterThan(GIC_TIMESTAMPS.DAY_2_END);
            else if (day === 3) blockIfLaterThan(GIC_TIMESTAMPS.DAY_3_END);
            else if (day === 5) blockIfLaterThan(GIC_TIMESTAMPS.DAY_5_END);

            // block spamming
            if (IS_PRODUCTION) {
                await this.gicService.rateLimitOnDayRegistration(userId, day);
            }

            if (await this.gicService.userHasRegisteredDay(userId, day)) {
                throw new Error(
                    `You have already registered for day ${day} of GIC`,
                );
            }

            if (await this.gicService.userHasCheckinDay(userId, day)) {
                throw new Error(
                    `You have checked in to day ${day} of GIC already`,
                );
            }

            const inviteIdString = req.query.inviteId as string;
            if (day != 5 && inviteIdString) {
                throw new Error(
                    `An invite code can only be used on day 5 of GIC`,
                );
            }

            let result;
            if (inviteIdString) {
                const inviteId = new Types.ObjectId(inviteIdString);
                if (inviteId.equals(userId)) {
                    throw new Error(`Cannot invite yourself...`);
                }
                if (!(await this.userService.findById(inviteId))) {
                    throw new Error(`Invite code invalid`);
                }
                result = await this.gicService.registerDay(
                    userId,
                    day,
                    inviteId,
                );
            } else {
                result = await this.gicService.registerDay(userId, day);
            }

            const user = await this.userService.findById(userId);
            if (day != 5) {
                this.mailService.sendToOne(
                    user.email,
                    `[GDSC Idea Contest 2023] Đăng ký thành công sự kiện "${
                        EVENT_NAME_LIST[day - 1]
                    }"`,
                    DAY_1_3_REGISTRATION_SUCCESSFUL_EMAIL(
                        user.name,
                        EVENT_DATE_LIST[day - 1],
                        EVENT_NAME_LIST[day - 1],
                        EVENT_TIME_LIST[day - 1],
                        EVENT_DESCRIPTION_LIST[day - 1],
                    ),
                );
            } else {
                this.mailService.sendToOne(
                    user.email,
                    `[GDSC Idea Contest 2023] Đăng ký thành công sự kiện "Idea Showcase"`,
                    DAY_5_REGISTRATION_SUCCESSFUL_EMAIL(
                        user.name,
                        aes256_encrypt(
                            JSON.stringify({ userId: userId.toString() }),
                        ),
                    ),
                );
            }

            res.composer.success(result);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async unregisterDay(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const day = parseInt(req.params.day);
            if (!(1 <= day && day <= 5) || day === 4) {
                throw new Error(`Can only register for days 1, 2, 3, and 5`);
            }

            // block unregistering after some date
            if (day === 1) blockIfLaterThan(GIC_TIMESTAMPS.DAY_1_START);
            else if (day === 2) blockIfLaterThan(GIC_TIMESTAMPS.DAY_2_START);
            else if (day === 3) blockIfLaterThan(GIC_TIMESTAMPS.DAY_3_START);
            else if (day === 5) blockIfLaterThan(GIC_TIMESTAMPS.DAY_5_START);

            if (!(await this.gicService.userHasRegisteredDay(userId, day))) {
                throw new Error(
                    `You aren't currently registered for day ${day} of GIC`,
                );
            }
            if (await this.gicService.userHasCheckinDay(userId, day)) {
                throw new Error(
                    `You have checked in to day ${day} of GIC already`,
                );
            }
            const result = await this.gicService.findOneDayRegAndUpdate(
                { registeredBy: userId, status: DayRegStatus.REGISTERED },
                { status: DayRegStatus.CANCELLED },
            );
            res.composer.success(result);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getRegisteredDays(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);

            const ans = await Promise.all(
                (
                    await this.gicService.findDayRegistrations({
                        registeredBy: userId,
                    })
                )
                    .filter(
                        (d) =>
                            d.status === DayRegStatus.REGISTERED ||
                            d.status === DayRegStatus.CHECKIN,
                    )
                    .map((d) => (async () => await d.populate('invitedBy'))()),
            );

            res.composer.success(ans);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getDayRegistrationById(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const userRoles = req.tokenMeta.roles;
            const regId = new Types.ObjectId(req.params.registrationId);

            const reg = await this.gicService.findDayRegById(regId);
            if (!reg) {
                throw new Error(`Day registration not found`);
            }
            if (
                !userId.equals(reg.registeredBy) &&
                !userRoles.includes(USER_ROLES.SYSTEM) &&
                !userRoles.includes(USER_ROLES.SUPER_ADMIN)
            ) {
                throw new Error(`You don't have permission to view this`);
            }
            res.composer.success(reg);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getPeopleUserInvited(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const ans = await Promise.all(
                (
                    await this.gicService.findDayRegistrations({
                        invitedBy: userId,
                        status: {
                            $in: [
                                DayRegStatus.REGISTERED,
                                DayRegStatus.CHECKIN,
                            ],
                        },
                    })
                ).map((d) => (async () => await d.populate('registeredBy'))()),
            );
            res.composer.success(ans);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error);
        }
    }

    async gacha(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);

            const item = await this.gicService.gacha(userId);
            res.composer.success({ item });
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async gachaPack(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);

            const items = await this.gicService.gachaPack(userId);
            res.composer.success({ items });
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async premiumGacha(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);

            const item = await this.gicService.premiumGacha(userId);
            res.composer.success({ item });
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async premiumGachaPack(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);

            const items = await this.gicService.premiumGachaPack(userId);
            res.composer.success({ items });
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async acquireAchievement(req: Request, res: Response) {
        try {
            const { roles } = req.tokenMeta as UserAuth;
            const { achievementId, email, ...body } = req.body;

            if (!_.includes(roles, USER_ROLES.GIC_ADMIN)) {
                throw Error('Permission Error');
            }

            const userId = (
                await this.userService.findOne({
                    email,
                })
            )._id;

            // TODO: GICAchievementService
            if (!body?.data) {
                throw Error('Invalid body');
            }

            if ([51, 52, 53].includes(achievementId)) {
                this.gicAchievementService.URLCreate(
                    userId,
                    body.data.urlCount,
                );
            }

            if ([54, 55].includes(achievementId)) {
                this.gicAchievementService.URLClick(userId, body.data.size);
            }

            res.composer.success('Sucess');
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }
}
