import AsyncLock from 'async-lock';
import { Types } from 'mongoose';
import GICAchievementModel from '../../models/gic/gic_achievements.model';
import { GicItem, GicItemName, itemsName } from './utils';
import Item, { ItemDocument } from '../../models/item.model';
import { inject, injectable } from 'inversify';
import { ServiceType } from '../../types';
import { SocketService } from '../../server-events/index';
import { TransactionService } from '../transaction.service';
import { ItemService } from '../item.service';

@injectable()
export class GICAchievementService {
    private lock: AsyncLock;
    private EXCLUDE_SPECIAL_LIMITED_HIDDEN: number[];
    private SPECIAL_ACHIEVEMENTS: number[];
    constructor(
        @inject(ServiceType.Transaction)
        private transactionService: TransactionService,
        @inject(ServiceType.Item) private itemService: ItemService,
        @inject(ServiceType.Socket) private socketService: SocketService,
    ) {
        this.lock = new AsyncLock();
        this.EXCLUDE_SPECIAL_LIMITED_HIDDEN = [];
        for (let i = 1; i <= 100; i++) {
            if (
                ![
                    6, 29, 30, 45, 48, 49, 50, 55, 60, 64, 65, 66, 80, 89, 92,
                    93, 100,
                ].includes(i)
            ) {
                this.EXCLUDE_SPECIAL_LIMITED_HIDDEN.push(i);
            }
        }
        this.SPECIAL_ACHIEVEMENTS = [
            29, 45, 48, 49, 55, 60, 64, 65, 80, 89, 92, 93, 100,
        ];
    }

    async sendItemGIC(itemData: ItemDocument) {
        console.log('Send Item', itemData);
        const item = await this.itemService.createNewItem(itemData);
        return item;
    }

    createGicRewardItem(userId: Types.ObjectId, itemName: GicItemName) {
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

    async getAchievementOfUser(userId: Types.ObjectId): Promise<number[]> {
        return await this.lock.acquire(userId.toString(), async () => {
            try {
                const doc = await GICAchievementModel.findOne({
                    userId: userId,
                });
                if (!doc) {
                    return [];
                }
                return doc.achievements;
            } catch(error) {
                console.log(error)
            }
        });
    }

    async getViewedAchievementOfUser(
        userId: Types.ObjectId,
    ): Promise<number[]> {
        return await this.lock.acquire(userId.toString(), async () => {
            try {
                const doc = await GICAchievementModel.findOne({
                    userId: userId,
                });
                const res = doc.achievements.filter(
                    (id) => !doc.viewedAchievements.includes(id),
                );
                return res;
            } catch(error) {
                console.log(error)
            }
        });
    }

    async viewAcheivement(userId: Types.ObjectId, achievementNumber: number) {
        await this.lock.acquire(userId.toString(), async () => {
            try {
                let doc = await GICAchievementModel.findOne({
                    userId: userId,
                });
                if (!doc) {
                    doc = new GICAchievementModel({
                        userId: userId,
                        achievements: [],
                        viewedAchievements: [],
                    });
                }
                doc.viewedAchievements.push(achievementNumber);
                doc.markModified('viewedAchievements');
                await doc.save();
            } catch(error) {
                console.log(error)
            }
        });
    }

    private async gotAPiece(userId: Types.ObjectId, item: GicItem) {
        await this.lock.acquire(userId.toString(), async () => {
            try {
                let d = await GICAchievementModel.findOne({
                    userId: userId,
                });
                if (!d) {
                    d = new GICAchievementModel({
                        userId: userId,
                        achievements: [],
                    });
                }

                const pieceList = await Item.find({
                    ownerId: userId,
                    name: { $in: itemsName },
                    collectionName: 'GicReward',
                });
                const myPieceCount = pieceList.length;

                if (!d.achievements.includes(1) && myPieceCount >= 25) {
                    d.achievements.push(1);
                    // TODO: send 1000 GCoins
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        1000,
                        "Hoàn thành nhiệm vụ 'Thợ săn Mảnh I' (Thu thập được 25 mảnh)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Thợ săn Mảnh I'",
                    );
                    this.completedAMission(userId);
                }
                if (!d.achievements.includes(2) && myPieceCount >= 50) {
                    d.achievements.push(2);
                    // TODO: send 2000 GCoins + MIRROR R
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'MIRROR R'),
                    );
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        2000,
                        "Hoàn thành nhiệm vụ 'Thợ săn Mảnh II' (Thu thập được 50 mảnh)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Thợ săn Mảnh II' (Thu thập được 50 mảnh)",
                    );
                    this.gotAPiece(userId, { name: 'MIRROR R', rare: 'MSR' });
                    this.completedAMission(userId);
                }
                if (!d.achievements.includes(3) && myPieceCount >= 100) {
                    d.achievements.push(3);
                    // TODO: send 2500 GCoins + TOTE2
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'TOTE2'),
                    );
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        2500,
                        "Hoàn thành nhiệm vụ 'Thợ săn Mảnh III' (Thu thập được 100 mảnh)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Thợ săn Mảnh III' (Thu thập được 100 mảnh)",
                    );
                    this.gotAPiece(userId, { name: 'TOTE2', rare: 'SR' });
                    this.completedAMission(userId);
                }
                if (!d.achievements.includes(4) && myPieceCount >= 200) {
                    d.achievements.push(4);
                    // TODO: send 5000 GCoins + 1x Normal pack
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        5000 + 1000,
                        "Hoàn thành nhiệm vụ 'Thợ săn Mảnh IV' (Thu thập được 200 mảnh)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Thợ săn Mảnh IV' (Thu thập được 200 mảnh)",
                    );
                    this.completedAMission(userId);
                }
                if (!d.achievements.includes(5) && myPieceCount >= 500) {
                    d.achievements.push(5);
                    // TODO: send 7500 GCoins + 1x Premium pack
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        7500 + 2000,
                        "Hoàn thành nhiệm vụ 'Thợ săn Mảnh V' (Thu thập được 500 mảnh)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Thợ săn Mảnh V' (Thu thập được 500 mảnh)",
                    );
                    this.completedAMission(userId);
                }

                if (!d.achievements.includes(6)) {
                    // does someone have keychain4, cup4, figure4, tote4?
                    const good =
                        (await Item.findOne({
                            ownerId: { $ne: userId },
                            collectionName: 'GicReward',
                            name: {
                                $in: ['KEYCHAIN4', 'CUP4', 'FIGURE4', 'TOTE4'],
                            },
                        })) == null;
                    const have =
                        (await Item.findOne({
                            ownerId: userId,
                            collectionName: 'GicReward',
                            name: {
                                $in: ['KEYCHAIN4', 'CUP4', 'FIGURE4', 'TOTE4'],
                            },
                        })) != null;
                    if (have && good) {
                        d.achievements.push(6);
                        // TODO: send 3x premium pack + FLASK4
                        await this.sendItemGIC(
                            this.createGicRewardItem(userId, 'FLASK4'),
                        );
                        await this.transactionService.createNewTransactionFromSystem(
                            userId,
                            2000 * 3,
                            "Hoàn thành nhiệm vụ 'Try hard' (Trở thành nguời nhanh nhất thu thập được mảnh KEYCHAIN4, CUP4, FIGURE4, TOTE4)",
                        );
                        this.socketService.notifyEvent(
                            userId.toString(),
                            "Bạn đã hoàn thành nhiệm vụ 'Try hard' (Trở thành nguời nhanh nhất thu thập được mảnh KEYCHAIN4, CUP4, FIGURE4, TOTE4)",
                        );
                        this.gotAPiece(userId, { name: 'FLASK4', rare: 'LIMITED' });
                        this.completedAMission(userId);
                    }
                }

                // achievements that invole unique pieces
                const uniqueNotGift = Array.from(
                    new Set(
                        pieceList
                            .map((x) => x.name)
                            .filter(
                                (x) => x.length === 1 || x.startsWith('MIRROR'),
                            ),
                    ),
                ).length;
                if (!d.achievements.includes(7) && uniqueNotGift >= 18) {
                    d.achievements.push(7);
                    // TODO: send 2000 gcoins
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        2000,
                        "Hoàn thành nhiệm vụ 'Nhà sưu tầm I' (Thu thập được 18 mảnh khác nhau (Không tính mảnh quà))",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Nhà sưu tầm I' (Thu thập được 18 mảnh khác nhau (Không tính mảnh quà))",
                    );
                    this.completedAMission(userId);
                }
                if (!d.achievements.includes(8) && uniqueNotGift >= 38) {
                    d.achievements.push(8);
                    // TODO: 1x Premium Pack  + Mảnh TOTE3 + MIRROR R
                    const obtainedItem = [
                        { name: 'TOTE3', rare: 'SR' },
                        { name: 'MIRROR R', rare: 'MSR' },
                    ];
                    await Promise.all(
                        obtainedItem.map((item: GicItem) =>
                            (async () => {
                                await this.sendItemGIC(
                                    this.createGicRewardItem(userId, item.name),
                                );
                                await this.gotAPiece(userId, item);
                            })(),
                        ),
                    );
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        2000,
                        "Hoàn thành nhiệm vụ 'Nhà sưu tầm II' (Thu thập toàn bộ các mảnh (Không tính mảnh quà))",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Nhà sưu tầm II' (Thu thập toàn bộ các mảnh (Không tính mảnh quà))",
                    );
                    this.completedAMission(userId);
                }

                d.markModified('achievements');
                await d.save();
            } catch(error) {
                console.log(error)
            }
        });
    }

    private async completedAMission(userId: Types.ObjectId) {
        await this.lock.acquire(userId.toString(), async () => {
            try {
                let d = await GICAchievementModel.findOne({
                    userId: userId,
                });
                if (!d) {
                    d = new GICAchievementModel({
                        userId: userId,
                        achievements: [],
                    });
                }
                if (!d.achievements.includes(99) && d.achievements.length >= 50) {
                    d.achievements.push(99);
                    // TODO: send FLASK2
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'FLASK2'),
                    );
                    this.completedAMission(userId);
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Một nửa chặng đường' (Hoàn thành 50 Nhiệm vụ)",
                    );
                    this.gotAPiece(userId, { name: 'FLASK2', rare: 'SSR' });
                }
                if (!d.achievements.includes(100)) {
                    const finished_100 = this.EXCLUDE_SPECIAL_LIMITED_HIDDEN.every(
                        (x) => d.achievements.includes(x),
                    );
                    if (finished_100) {
                        d.achievements.push(100);
                        // TODO: send 50000 GCoin
                        await this.transactionService.createNewTransactionFromSystem(
                            userId,
                            50000,
                            "Hoàn thành nhiệm vụ 'Liệu đây là kết thúc?' (Hoàn thành tất cả các nhiệm vụ (trừ nhiệm vụ giới hạn và nhiệm vụ đặc biệt))",
                        );
                        this.socketService.notifyEvent(
                            userId.toString(),
                            "Bạn đã hoàn thành nhiệm vụ 'Liệu đây là kết thúc?' (Hoàn thành tất cả các nhiệm vụ (trừ nhiệm vụ giới hạn và nhiệm vụ đặc biệt))",
                        );
                        this.completedAMission(userId);
                    }
                }
                if (!d.achievements.includes(101)) {
                    const have_100 = d.achievements.includes(100);
                    const have_5_special =
                        this.SPECIAL_ACHIEVEMENTS.filter((x) =>
                            d.achievements.includes(x),
                        ).length >= 5;
                    if (have_100 || have_5_special) {
                        d.achievements.push(101);
                        // TODO: 100000 GCoin + special message
                        await this.transactionService.createNewTransactionFromSystem(
                            userId,
                            100000,
                            "Hoàn thành nhiệm vụ 'Hạ màn!!!' (Hoàn thành nhiệm vụ 100 hoặc khi hoàn thành 5 nhiệm vụ đặc biệt)",
                        );
                        this.socketService.notifyEvent(
                            userId.toString(),
                            "Bạn đã hoàn thành nhiệm vụ 'Hạ màn!!!' (Hoàn thành nhiệm vụ 100 hoặc khi hoàn thành 5 nhiệm vụ đặc biệt)",
                        );
                        this.completedAMission(userId);
                    }
                }
                d.markModified('achievements');
                await d.save();
            } catch(error) {
                console.log(error)
            }
        });
    }

    public async userChangeMoney(userId: Types.ObjectId, amount: number) {
        await this.lock.acquire(userId.toString(), async () => {
            try {
                if (amount < 0) {
                    let d = await GICAchievementModel.findOne({
                        userId: userId,
                    });
                    if (!d) {
                        d = new GICAchievementModel({
                            userId: userId,
                            achievements: [],
                        });
                    }
                    d.moneySpent += -amount;
                    if (!d.achievements.includes(67) && d.moneySpent >= 5000) {
                        d.achievements.push(67);
                        // 1x normal pack
                        await this.transactionService.createNewTransactionFromSystem(
                            userId,
                            1000,
                            "Hoàn thành nhiệm vụ 'Trung lưu tiêu tiền' (Xài 5000 GCoin)",
                        );
                        this.socketService.notifyEvent(
                            userId.toString(),
                            "Bạn đã hoàn thành nhiệm vụ 'Trung lưu tiêu tiền' (Xài 5000 GCoin)",
                        );
                        this.completedAMission(userId);
                    }
                    if (!d.achievements.includes(68) && d.moneySpent >= 12000) {
                        d.achievements.push(68);
                        // Premium Pack
                        await this.transactionService.createNewTransactionFromSystem(
                            userId,
                            2000,
                            "Hoàn thành nhiệm vụ 'Thượng lưu tiêu tiền' (Xài 12000 GCoin)",
                        );
                        this.socketService.notifyEvent(
                            userId.toString(),
                            "Bạn đã hoàn thành nhiệm vụ 'Thượng lưu tiêu tiền' (Xài 12000 GCoin)",
                        );
                        this.completedAMission(userId);
                    }
                    if (!d.achievements.includes(69) && d.moneySpent >= 25000) {
                        d.achievements.push(69);
                        // 1x Normal Pack + 1x Premium Pack + 1 MIRROR R
                        await this.transactionService.createNewTransactionFromSystem(
                            userId,
                            3000,
                            "Hoàn thành nhiệm vụ 'Triệu phú tiêu tiền' (Xài 25000 GCoin)",
                        );
                        this.socketService.notifyEvent(
                            userId.toString(),
                            "Bạn đã hoàn thành nhiệm vụ 'Triệu phú tiêu tiền' (Xài 25000 GCoin)",
                        );
                        await this.sendItemGIC(
                            this.createGicRewardItem(userId, 'MIRROR R'),
                        );
                        this.gotAPiece(userId, { name: 'MIRROR R', rare: 'MSR' });
                        this.completedAMission(userId);
                    }
                    if (!d.achievements.includes(70) && d.moneySpent >= 50000) {
                        d.achievements.push(70);
                        // Premium pack +  Mirror SR
                        await this.transactionService.createNewTransactionFromSystem(
                            userId,
                            2000,
                            "Hoàn thành nhiệm vụ 'Tỉ phú tiêu tiền' (Xài 50000 GCoin)",
                        );
                        this.socketService.notifyEvent(
                            userId.toString(),
                            "Bạn đã hoàn thành nhiệm vụ 'Tỉ phú tiêu tiền' (Xài 50000 GCoin)",
                        );
                        await this.sendItemGIC(
                            this.createGicRewardItem(userId, 'MIRROR SR'),
                        );
                        this.gotAPiece(userId, { name: 'MIRROR SR', rare: 'MSR' });
                        this.completedAMission(userId);
                    }
                    d.markModified("achievements")
                    await d.save()
                }
            } catch(error) {
                console.log(error)
            }
        });
    }

    public async singleGacha(userId: Types.ObjectId, x: GicItem) {
        await this.lock.acquire(userId.toString(), async () => {
            try {
                this.gotAPiece(userId, x);
            } catch(error) {
                console.log(error)
            }
        });
    }

    public async packGacha(userId: Types.ObjectId, a: GicItem[]) {
        await this.lock.acquire(userId.toString(), async () => {
            try {
                a.forEach((x) => this.gotAPiece(userId, x));

                let d = await GICAchievementModel.findOne({
                    userId: userId,
                });
                if (!d) {
                    d = new GICAchievementModel({
                        userId: userId,
                        achievements: [],
                    });
                }

                const R = a.filter((x) => x.rare === 'R').length;
                d.R_Pack += R;
                d.packCount++;

                if (!d.achievements.includes(9) && d.R_Pack >= 10) {
                    d.achievements.push(9);
                    // TODO: 1000 gcoin
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        1000,
                        "Hoàn thành nhiệm vụ 'Siêu thợ săn Mảnh I' (Kiếm được 10 mảnh R từ mở Pack)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Siêu thợ săn Mảnh I' (Kiếm được 10 mảnh R từ mở Pack)",
                    );
                    this.completedAMission(userId);
                }
                if (!d.achievements.includes(10) && d.R_Pack >= 20) {
                    d.achievements.push(10);
                    // TODO: 5000 gcoin
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        5000,
                        "Hoàn thành nhiệm vụ 'Siêu thợ săn Mảnh II' (Kiếm được 20 mảnh R từ mở Pack)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Siêu thợ săn Mảnh II' (Kiếm được 20 mảnh R từ mở Pack)",
                    );
                    this.completedAMission(userId);
                }
                if (!d.achievements.includes(73) && d.packCount >= 1) {
                    d.achievements.push(73);
                    // TODO: 500 gcoin
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        500,
                        "Hoàn thành nhiệm vụ 'Nhập môn Gacha' (Mở Normal Pack 1 lần)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Nhập môn Gacha' (Mở Normal Pack 1 lần)",
                    );
                    this.completedAMission(userId);
                }
                if (!d.achievements.includes(74) && d.packCount >= 5) {
                    d.achievements.push(74);
                    // TODO: 1000 gcoin
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        1000,
                        "Hoàn thành nhiệm vụ 'Đam mê Gacha' (Mở Normal Pack 5 lần)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Đam mê Gacha' (Mở Normal Pack 5 lần)",
                    );
                    this.completedAMission(userId);
                }
                d.markModified('achievements');
                await d.save();
            } catch(error) {
                console.log(error)
            }
        });
    }

    public async singlePremiumGacha(userId: Types.ObjectId, x: GicItem) {
        await this.lock.acquire(userId.toString(), async () => {
            try {
                this.gotAPiece(userId, x);
            } catch(error) {
                console.log(error)
            }
        });
    }

    public async premiumPackGacha(userId: Types.ObjectId, a: GicItem[]) {
        await this.lock.acquire(userId.toString(), async () => {
            try {
                a.forEach((x) => this.gotAPiece(userId, x));

                let d = await GICAchievementModel.findOne({
                    userId: userId,
                });
                if (!d) {
                    d = new GICAchievementModel({
                        userId: userId,
                        achievements: [],
                    });
                }

                const SR = a.filter((x) => x.rare === 'SR').length;
                const FLASK3 = a.filter((x) => x.name === 'FLASK3').length;
                d.SR_PremiumPack += SR;
                d.FLASK3_PremiumPack += FLASK3;
                d.premiumPackCount++;

                if (!d.achievements.includes(11) && d.SR_PremiumPack >= 1) {
                    d.achievements.push(11);
                    // TODO: 5000 gcoins + MIRROR R
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        5000,
                        "Hoàn thành nhiệm vụ 'Trời độ' (Kiếm được 1 mảnh SR từ Premium Pack)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Trời độ' (Kiếm được 1 mảnh SR từ Premium Pack)",
                    );
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'MIRROR R'),
                    );
                    this.gotAPiece(userId, { name: 'MIRROR R', rare: 'MSR' });
                    this.completedAMission(userId);
                }
                if (!d.achievements.includes(75) && d.premiumPackCount >= 1) {
                    d.achievements.push(75);
                    // 500 GCoin
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        500,
                        "Hoàn thành nhiệm vụ 'Gacha Thượng lưu' (Mở Premium Pack 1 lần)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Gacha Thượng lưu' (Mở Premium Pack 1 lần)",
                    );
                    this.completedAMission(userId);
                }
                if (!d.achievements.includes(76) && d.premiumPackCount >= 3) {
                    d.achievements.push(76);
                    // 1000 GCoin + 1 MIRROR R
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        1000,
                        "Hoàn thành nhiệm vụ 'Chưa gacha đủ sao?' (Mở Premium Pack 3 lần)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Chưa gacha đủ sao?' (Mở Premium Pack 3 lần)",
                    );
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'MIRROR R'),
                    );
                    this.gotAPiece(userId, { name: 'MIRROR R', rare: 'MSR' });
                    this.completedAMission(userId);
                }
                if (!d.achievements.includes(77) && d.premiumPackCount >= 5) {
                    d.achievements.push(77);
                    // 5000 gcoin
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        5000,
                        "Hoàn thành nhiệm vụ 'Dừng lại đi!' (Mở Premium Pack 5 lần)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Dừng lại đi!' (Mở Premium Pack 5 lần)",
                    );
                    this.completedAMission(userId);
                }
                if (!d.achievements.includes(78) && d.premiumPackCount >= 7) {
                    d.achievements.push(78);
                    // 5000 GCoin + 1 MIRROR R
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        5000,
                        "Hoàn thành nhiệm vụ 'Không thể quay đầu được nữa đâu!' (Mở Premium Pack 7 lần)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Không thể quay đầu được nữa đâu!' (Mở Premium Pack 7 lần)",
                    );
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'MIRROR R'),
                    );
                    this.gotAPiece(userId, { name: 'MIRROR R', rare: 'MSR' });
                    this.completedAMission(userId);
                }
                if (!d.achievements.includes(79) && d.premiumPackCount >= 10) {
                    d.achievements.push(79);
                    // 10000 GCoin + 1 MIRROR R
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        10000,
                        "Hoàn thành nhiệm vụ 'Hết cứu...' (Mở Premium Pack 10 lần)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Hết cứu...' (Mở Premium Pack 10 lần)",
                    );
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'MIRROR R'),
                    );
                    this.gotAPiece(userId, { name: 'MIRROR R', rare: 'MSR' });
                    this.completedAMission(userId);
                }
                if (!d.achievements.includes(80) && d.FLASK3_PremiumPack >= 1) {
                    d.achievements.push(80);
                    // 10000 GCoin + 1 MIRROR R
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        10000,
                        "Hoàn thành nhiệm vụ 'Cái giá là gì...' (Kiếm được mảnh FLASK3 từ Premium Pack)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Cái giá là gì...' (Kiếm được mảnh FLASK3 từ Premium Pack)",
                    );
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'MIRROR R'),
                    );
                    this.gotAPiece(userId, { name: 'MIRROR R', rare: 'MSR' });
                    this.completedAMission(userId);
                }
                d.markModified('achievements');
                await d.save();
            } catch(error) {
                console.log(error)
            }
        });
    }

    public async combinePieces(userId: Types.ObjectId, s: string) {
        await this.lock.acquire(userId.toString(), async () => {
            try {
                let d = await GICAchievementModel.findOne({
                    userId: userId,
                });
                if (!d) {
                    d = new GICAchievementModel({
                        userId: userId,
                        achievements: [],
                    });
                }
    
                if (s === "PROBLEM") {
                    if (d.achievements.includes(12)) {
                        this.socketService.notifyEvent(
                            userId.toString(),
                            `Bạn đã hoàn thành nhiệm vụ 'Ghép được chữ "PROBLEM" từ trước rồi`
                        )
                        return
                    }
                    d.achievements.push(12)
                    // 2000 GCoin
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        2000,
                        'Hoàn thành nhiệm vụ \'Khó khăn\' (Ghép được chữ "PROBLEM")',
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        'Bạn đã hoàn thành nhiệm vụ \'Khó khăn\' (Ghép được chữ "PROBLEM")',
                    );
                    this.completedAMission(userId);
                }
    
                if (s === "SOLUTION") {
                    if (d.achievements.includes(13)) {
                        this.socketService.notifyEvent(
                            userId.toString(),
                            `Bạn đã hoàn thành nhiệm vụ 'Ghép được chữ "SOLUTION" từ trước rồi`
                        )
                        return
                    }
                    d.achievements.push(13)
                    // 5000 GCoin + 1x Normal Pack + 1 MIRROR R
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        5000 + 1000,
                        'Hoàn thành nhiệm vụ \'Giải pháp\' (Ghép được chữ "SOLUTION")',
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        'Bạn đã hoàn thành nhiệm vụ \'Giải pháp\' (Ghép được chữ "SOLUTION")',
                    );
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'MIRROR R'),
                    );
                    this.gotAPiece(userId, { name: 'MIRROR R', rare: 'MSR' });
                    this.completedAMission(userId);
                }
    
                if (s === "DESIGN") {
                    if (d.achievements.includes(14)) {
                        this.socketService.notifyEvent(
                            userId.toString(),
                            `Bạn đã hoàn thành nhiệm vụ 'Ghép được chữ "DESIGN" từ trước rồi`
                        )
                        return
                    }
                    d.achievements.push(14)
                    // 2000 gcoins
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        2000,
                        'Hoàn thành nhiệm vụ \'Thiết kế\' (Ghép được chữ "DESIGN")',
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        'Bạn đã hoàn thành nhiệm vụ \'Thiết kế\' (Ghép được chữ "DESIGN")',
                    );
                    this.completedAMission(userId);
                }
    
                if (s === "PRESENT") {
                    if (d.achievements.includes(15)) {
                        this.socketService.notifyEvent(
                            userId.toString(),
                            `Bạn đã hoàn thành nhiệm vụ 'Ghép được chữ "PRESENT" từ trước rồi`
                        )
                        return
                    }
                    d.achievements.push(15)
                    // 2000 gcoins
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        2000,
                        'Hoàn thành nhiệm vụ \'Trình bày\' (Ghép được chữ "PRESENT")',
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        'Bạn đã hoàn thành nhiệm vụ \'Trình bày\' (Ghép được chữ "PRESENT")',
                    );
                    this.completedAMission(userId);
                }
    
                if (s === "11062023") {
                    if (d.achievements.includes(16)) {
                        this.socketService.notifyEvent(
                            userId.toString(),
                            `Bạn đã hoàn thành nhiệm vụ 'Ghép được chữ "11062023" từ trước rồi`
                        )
                        return
                    }
                    d.achievements.push(16)
                    // 2000 gcoins
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        2000,
                        'Hoàn thành nhiệm vụ \'Opening Day\' (Ghép được chữ "11062023")',
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        'Bạn đã hoàn thành nhiệm vụ \'Opening Day\' (Ghép được chữ "11062023")',
                    );
                    this.completedAMission(userId);
                }
    
                if (s === "14062023") {
                    if (d.achievements.includes(17)) {
                        this.socketService.notifyEvent(
                            userId.toString(),
                            `Bạn đã hoàn thành nhiệm vụ 'Ghép được chữ "14062023" từ trước rồi`
                        )
                        return
                    }
                    d.achievements.push(17)
                    // 2000 gcoins
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        2000,
                        'Hoàn thành nhiệm vụ \'Seminar 1\' (Ghép được chữ "14062023")',
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        'Bạn đã hoàn thành nhiệm vụ \'Seminar 1\' (Ghép được chữ "14062023")',
                    );
                    this.completedAMission(userId);
                }
    
                if (s === "17062023") {
                    if (d.achievements.includes(18)) {
                        this.socketService.notifyEvent(
                            userId.toString(),
                            `Bạn đã hoàn thành nhiệm vụ 'Ghép được chữ "17062023" từ trước rồi`
                        )
                        return
                    }
                    d.achievements.push(18)
                    // 2000 gcoins
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        2000,
                        'Hoàn thành nhiệm vụ \'Seminar 2\' (Ghép được chữ "17062023")',
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        'Bạn đã hoàn thành nhiệm vụ \'Seminar 2\' (Ghép được chữ "17062023")',
                    );
                    this.completedAMission(userId);
                }
    
                if (s === "25062023") {
                    if (d.achievements.includes(19)) {
                        this.socketService.notifyEvent(
                            userId.toString(),
                            `Bạn đã hoàn thành nhiệm vụ 'Ghép được chữ "25062023" từ trước rồi`
                        )
                        return
                    }
                    d.achievements.push(19)
                    // 5000 GCoin + 1x Normal Pack + 1 MIRROR R
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        5000 + 1000,
                        'Hoàn thành nhiệm vụ \'Idea Showcase\' (Ghép được chữ "25062023")',
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        'Bạn đã hoàn thành nhiệm vụ \'Idea Showcase\' (Ghép được chữ "25062023")',
                    );
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'MIRROR R'),
                    );
                    this.gotAPiece(userId, { name: 'MIRROR R', rare: 'MSR' });
                    this.completedAMission(userId);
                }
    
                if (s === "KEYCHAIN") {
                    if (d.achievements.includes(20)) {
                        this.socketService.notifyEvent(
                            userId.toString(),
                            `Bạn đã hoàn thành nhiệm vụ 'Ghép được chữ "KEYCHAIN" từ trước rồi`
                        )
                        return
                    }
                    d.achievements.push(20)
                    // 2000 GCoin + Mảnh KEYCHAIN1
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        2000,
                        'Hoàn thành nhiệm vụ \'Móc khóa\' (Ghép được chữ "KEYCHAIN")',
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        'Bạn đã hoàn thành nhiệm vụ \'Móc khóa\' (Ghép được chữ "KEYCHAIN")',
                    );
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'KEYCHAIN1'),
                    );
                    this.gotAPiece(userId, { name: 'KEYCHAIN1', rare: 'SR' });
                    this.completedAMission(userId);
                }
    
                if (s === "CUP") {
                    if (d.achievements.includes(21)) {
                        this.socketService.notifyEvent(
                            userId.toString(),
                            `Bạn đã hoàn thành nhiệm vụ 'Ghép được chữ "CUP" từ trước rồi`
                        )
                        return
                    }
                    d.achievements.push(21)
                    // 2000 GCoin + Mảnh CUP1
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        2000,
                        'Hoàn thành nhiệm vụ \'Ly sứ\' (Ghép được chữ "CUP")',
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        'Bạn đã hoàn thành nhiệm vụ \'Ly sứ\' (Ghép được chữ "CUP")',
                    );
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'CUP1'),
                    );
                    this.gotAPiece(userId, { name: 'CUP1', rare: 'SR' });
                    this.completedAMission(userId);
                }
    
                if (s === "FIGURE") {
                    if (d.achievements.includes(22)) {
                        this.socketService.notifyEvent(
                            userId.toString(),
                            `Bạn đã hoàn thành nhiệm vụ 'Ghép được chữ "FIGURE" từ trước rồi`
                        )
                        return
                    }
                    d.achievements.push(22)
                    // 2000 GCoin + Mảnh FIGURE1
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        2000,
                        'Hoàn thành nhiệm vụ \'Figure\' (Ghép được chữ "FIGURE")',
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        'Bạn đã hoàn thành nhiệm vụ \'Figure\' (Ghép được chữ "FIGURE")',
                    );
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'FIGURE1'),
                    );
                    this.gotAPiece(userId, { name: 'FIGURE1', rare: 'SR' });
                    this.completedAMission(userId);
                }
    
                if (s === "TOTE BAG") {
                    if (d.achievements.includes(23)) {
                        this.socketService.notifyEvent(
                            userId.toString(),
                            `Bạn đã hoàn thành nhiệm vụ 'Ghép được chữ "TOTE BAG" từ trước rồi`
                        )
                        return
                    }
                    d.achievements.push(23)
                    // 2000 GCoin + Mảnh TOTE1
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        2000,
                        'Hoàn thành nhiệm vụ \'Túi tote\' (Ghép được chữ "TOTE BAG")',
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        'Bạn đã hoàn thành nhiệm vụ \'Túi tote\' (Ghép được chữ "TOTE BAG")',
                    );
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'TOTE1'),
                    );
                    this.gotAPiece(userId, { name: 'TOTE1', rare: 'SR' });
                    this.completedAMission(userId);
                }
    
                if (s === "VACUUM FLASK") {
                    if (d.achievements.includes(24)) {
                        this.socketService.notifyEvent(
                            userId.toString(),
                            `Bạn đã hoàn thành nhiệm vụ 'Ghép được chữ "VACUUM FLASK" từ trước rồi`
                        )
                        return
                    }
                    d.achievements.push(24)
                    // 2000 GCoin + Mảnh FLASK1
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        2000,
                        'Hoàn thành nhiệm vụ \'Bình giữ nhiệt\' (Ghép được chữ "VACUUM FLASK")',
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        'Bạn đã hoàn thành nhiệm vụ \'Bình giữ nhiệt\' (Ghép được chữ "VACUUM FLASK")',
                    );
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'FLASK1'),
                    );
                    this.gotAPiece(userId, { name: 'FLASK1', rare: 'SSR' });
                    this.completedAMission(userId);
                }
    
                if (s === "IDEA BOARD") {
                    if (d.achievements.includes(25)) {
                        this.socketService.notifyEvent(
                            userId.toString(),
                            `Bạn đã hoàn thành nhiệm vụ 'Ghép được chữ "IDEA BOARD" từ trước rồi`
                        )
                        return
                    }
                    d.achievements.push(25)
                    // 5000 GCoin + 1x Normal Pack + 1 MIRROR R
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        5000 + 1000,
                        'Hoàn thành nhiệm vụ \'Bảng ý tưởng\' (Ghép được chữ "IDEA BOARD")',
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        'Bạn đã hoàn thành nhiệm vụ \'Bảng ý tưởng\' (Ghép được chữ "IDEA BOARD")',
                    );
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'MIRROR R'),
                    );
                    this.gotAPiece(userId, { name: 'MIRROR R', rare: 'MSR' });
                    this.completedAMission(userId);
                }
    
                if (s === "INVITE FRIEND") {
                    if (d.achievements.includes(26)) {
                        this.socketService.notifyEvent(
                            userId.toString(),
                            `Bạn đã hoàn thành nhiệm vụ 'Ghép được chữ "INVITE FRIEND" từ trước rồi`
                        )
                        return
                    }
                    d.achievements.push(26)
                    // 5000 GCoin + 1x Normal Pack + 1 MIRROR R
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        5000 + 1000,
                        'Hoàn thành nhiệm vụ \'Mời bạn\' (Ghép được chữ "INVITE FRIEND")',
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        'Bạn đã hoàn thành nhiệm vụ \'Mời bạn\' (Ghép được chữ "INVITE FRIEND")',
                    );
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'MIRROR R'),
                    );
                    this.gotAPiece(userId, { name: 'MIRROR R', rare: 'MSR' });
                    this.completedAMission(userId);
                }
    
                if (s === "BAEMIN TECH") {
                    if (d.achievements.includes(27)) {
                        this.socketService.notifyEvent(
                            userId.toString(),
                            `Bạn đã hoàn thành nhiệm vụ 'Ghép được chữ "BAEMIN TECH" từ trước rồi`
                        )
                        return
                    }
                    d.achievements.push(27)
                    // 7500 GCoin + 2x Normal Pack + 1 MIRROR R
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        7500 + 2000,
                        'Hoàn thành nhiệm vụ \'BAEMIN Tech\' (Ghép được chữ "BAEMIN TECH")',
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        'Bạn đã hoàn thành nhiệm vụ \'BAEMIN Tech\' (Ghép được chữ "BAEMIN TECH")',
                    );
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'MIRROR R'),
                    );
                    this.gotAPiece(userId, { name: 'MIRROR R', rare: 'MSR' });
                    this.completedAMission(userId);
                }
    
                if (s === "GDSC IDEA CONTEST 2023") {
                    if (d.achievements.includes(28)) {
                        this.socketService.notifyEvent(
                            userId.toString(),
                            `Bạn đã hoàn thành nhiệm vụ 'Ghép được chữ "GDSC IDEA CONTEST 2023" từ trước rồi`
                        )
                        return
                    }
                    d.achievements.push(28)
                    // 10000 GCoin + 1x Normal Pack + Mảnh TOTE4
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        10000,
                        'Hoàn thành nhiệm vụ \'GIC 2023\' (Ghép được chữ "GDSC IDEA CONTEST 2023")',
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        'Bạn đã hoàn thành nhiệm vụ \'GIC 2023\' (Ghép được chữ "GDSC IDEA CONTEST 2023")',
                    );
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'TOTE4'),
                    );
                    this.gotAPiece(userId, { name: 'TOTE4', rare: 'SSR' });
                    this.completedAMission(userId);
                }
    
                if (s === "GOOGLE DEVELOPER STUDENT CLUB HCMUT") {
                    if (d.achievements.includes(29)) {
                        this.socketService.notifyEvent(
                            userId.toString(),
                            `Bạn đã hoàn thành nhiệm vụ 'Ghép được chữ "GOOGLE DEVELOPER STUDENT CLUB HCMUT" từ trước rồi`
                        )
                        return
                    }
                    d.achievements.push(29);
                    // 15000 GCoin + 3x Premium Pack
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        15000 + 3 * 2000,
                        'Hoàn thành nhiệm vụ \'Fan cứng\' (Ghép được chữ "GOOGLE DEVELOPER STUDENT CLUB HCMUT")',
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        'Bạn đã hoàn thành nhiệm vụ \'Fan cứng\' (Ghép được chữ "GOOGLE DEVELOPER STUDENT CLUB HCMUT")',
                    );
                    this.completedAMission(userId);
    
                    if (!d.achievements.includes(30)) {
                        const good =
                            (await GICAchievementModel.findOne({
                                userId: { $ne: userId },
                                achievements: 30,
                            })) == null;
                        if (good) {
                            d.achievements.push(30);
                            // 10000 GCoin + Mảnh FLASK4
                            await this.transactionService.createNewTransactionFromSystem(
                                userId,
                                10000,
                                'Hoàn thành nhiệm vụ \'FAN SIÊU SIÊU CỨNG\' (Trở thành người nhanh nhất ghép được chữ "GOOGLE DEVELOPER STUDENT CLUB HCMUT")',
                            );
                            this.socketService.notifyEvent(
                                userId.toString(),
                                'Bạn đã hoàn thành nhiệm vụ \'FAN SIÊU SIÊU CỨNG\' (Trở thành người nhanh nhất ghép được chữ "GOOGLE DEVELOPER STUDENT CLUB HCMUT")',
                            );
                            await this.sendItemGIC(
                                this.createGicRewardItem(userId, 'FLASK4'),
                            );
                            this.gotAPiece(userId, {
                                name: 'FLASK4',
                                rare: 'LIMITED',
                            });
                            this.completedAMission(userId);
                        }
                    }
                }
                d.markModified('achievements');
                await d.save();
            } catch(error) {
                console.log(error)
            }
        });
    }

    public async addDiscordAchievement(userId: Types.ObjectId, id: number) {
        await this.lock.acquire(userId.toString(), async () => {
            try {
                let d = await GICAchievementModel.findOne({
                    userId: userId,
                });
                if (!d) {
                    d = new GICAchievementModel({
                        userId: userId,
                        achievements: [],
                    });
                }
                if (!d.achievements.includes(id)) {
                    switch (id) {
                        case 31: {
                            // 1000 GCoin + 1x Normal Pack + CUP2
                            await this.transactionService.createNewTransactionFromSystem(
                                userId,
                                2000,
                                "Hoàn thành nhiệm vụ 'Chào mừng' (Kết nối tài khoản với Discord Bot)",
                            );
                            this.socketService.notifyEvent(
                                userId.toString(),
                                "Bạn đã hoàn thành nhiệm vụ 'Chào mừng' (Kết nối tài khoản với Discord Bot)",
                            );
                            await this.sendItemGIC(
                                this.createGicRewardItem(userId, 'CUP2'),
                            );
                            this.gotAPiece(userId, { name: 'CUP2', rare: 'SR' });
                            break;
                        }
                        case 32: {
                            // 1000 GCoin
                            await this.transactionService.createNewTransactionFromSystem(
                                userId,
                                1000,
                                "Hoàn thành nhiệm vụ 'Cày cuốc chăm chỉ I' (/work 1 lần trong kênh daily-and-work)",
                            );
                            this.socketService.notifyEvent(
                                userId.toString(),
                                "Bạn đã hoàn thành nhiệm vụ 'Cày cuốc chăm chỉ I' (/work 1 lần trong kênh daily-and-work)",
                            );
                            break;
                        }
                        case 33: {
                            // 1000 GCoin
                            await this.transactionService.createNewTransactionFromSystem(
                                userId,
                                1000,
                                "Hoàn thành nhiệm vụ 'Cày cuốc chăm chỉ II' (/work 14 lần trong kênh daily-and-work)",
                            );
                            this.socketService.notifyEvent(
                                userId.toString(),
                                "Bạn đã hoàn thành nhiệm vụ 'Cày cuốc chăm chỉ II' (/work 14 lần trong kênh daily-and-work)",
                            );
                            break;
                        }
                        case 34: {
                            // 1000 GCoin
                            await this.transactionService.createNewTransactionFromSystem(
                                userId,
                                1000,
                                "Hoàn thành nhiệm vụ 'Cày cuốc chăm chỉ III' (/daily 7 lần trong kênh daily-and-work)",
                            );
                            this.socketService.notifyEvent(
                                userId.toString(),
                                "Bạn đã hoàn thành nhiệm vụ 'Cày cuốc chăm chỉ III' (/daily 7 lần trong kênh daily-and-work)",
                            );
                            break;
                        }
                        case 35: {
                            // 1000 GCoin
                            await this.transactionService.createNewTransactionFromSystem(
                                userId,
                                1000,
                                "Hoàn thành nhiệm vụ 'Let's DUEL!!!' (Chơi /guess 3 lần trong kênh battle)",
                            );
                            this.socketService.notifyEvent(
                                userId.toString(),
                                "Bạn đã hoàn thành nhiệm vụ 'Let's DUEL!!!' (Chơi /guess 3 lần trong kênh battle)",
                            );
                            break;
                        }
                        case 36: {
                            // 2000 gcoin + 1 normal pack
                            await this.transactionService.createNewTransactionFromSystem(
                                userId,
                                3000,
                                "Hoàn thành nhiệm vụ 'Tiên tri' (Guess đúng trong không quá 10 lượt)",
                            );
                            this.socketService.notifyEvent(
                                userId.toString(),
                                "Bạn đã hoàn thành nhiệm vụ 'Tiên tri' (Guess đúng trong không quá 10 lượt)",
                            );
                            break;
                        }
                        case 37: {
                            // 1000 gcoin
                            await this.transactionService.createNewTransactionFromSystem(
                                userId,
                                1000,
                                "Hoàn thành nhiệm vụ 'It's Hangman Time!' (Chơi /hangman 3 lần trong kênh battle)",
                            );
                            this.socketService.notifyEvent(
                                userId.toString(),
                                "Bạn đã hoàn thành nhiệm vụ 'It's Hangman Time!' (Chơi /hangman 3 lần trong kênh battle)",
                            );
                            break;
                        }
                        case 38: {
                            // 2000 GCoin + 1x Normal Pack
                            await this.transactionService.createNewTransactionFromSystem(
                                userId,
                                3000,
                                "Hoàn thành nhiệm vụ 'Từ điển sống' (Thắng hangman trong không quá 10 lượt)",
                            );
                            this.socketService.notifyEvent(
                                userId.toString(),
                                "Bạn đã hoàn thành nhiệm vụ 'Từ điển sống' (Thắng hangman trong không quá 10 lượt)",
                            );
                            break;
                        }
                        case 39: {
                            // 1000 gcoin
                            await this.transactionService.createNewTransactionFromSystem(
                                userId,
                                1000,
                                "Hoàn thành nhiệm vụ 'Kéo, búa... BAO!' (Chơi /rps 1 lần trong kênh battle)",
                            );
                            this.socketService.notifyEvent(
                                userId.toString(),
                                "Bạn đã hoàn thành nhiệm vụ 'Kéo, búa... BAO!' (Chơi /rps 1 lần trong kênh battle)",
                            );
                            break;
                        }
                        case 40: {
                            // 2000 GCoin + 1x Normal Pack
                            await this.transactionService.createNewTransactionFromSystem(
                                userId,
                                3000,
                                "Hoàn thành nhiệm vụ 'Chơi theo meta' (Thắng /rps bằng búa 3 lần)",
                            );
                            this.socketService.notifyEvent(
                                userId.toString(),
                                "Bạn đã hoàn thành nhiệm vụ 'Chơi theo meta' (Thắng /rps bằng búa 3 lần)",
                            );
                            break;
                        }
                        case 41: {
                            // 1000 GCoin
                            await this.transactionService.createNewTransactionFromSystem(
                                userId,
                                1000,
                                "Hoàn thành nhiệm vụ 'Chiến lược gia' (Battle thắng 1 lần)",
                            );
                            this.socketService.notifyEvent(
                                userId.toString(),
                                "Bạn đã hoàn thành nhiệm vụ 'Chiến lược gia' (Battle thắng 1 lần)",
                            );
                            break;
                        }
                        case 42: {
                            // 2000 GCoin + 1x Normal Pack
                            await this.transactionService.createNewTransactionFromSystem(
                                userId,
                                3000,
                                "Hoàn thành nhiệm vụ 'Siêu chiến lược gia' (Battle thắng 5 lần)",
                            );
                            this.socketService.notifyEvent(
                                userId.toString(),
                                "Bạn đã hoàn thành nhiệm vụ 'Siêu chiến lược gia' (Battle thắng 5 lần)",
                            );
                            break;
                        }
                        case 43: {
                            // 5000 GCoin  + 3x MIRROR R
                            await Promise.all(
                                [1, 2, 3].map((_) =>
                                    (async () => {
                                        await this.sendItemGIC(
                                            this.createGicRewardItem(
                                                userId,
                                                'MIRROR R',
                                            ),
                                        );
                                        this.gotAPiece(userId, {
                                            name: 'MIRROR R',
                                            rare: 'MSR',
                                        });
                                    })(),
                                ),
                            );
                            await this.transactionService.createNewTransactionFromSystem(
                                userId,
                                5000,
                                "Hoàn thành nhiệm vụ 'Siêu siêu chiến lược gia' (Battle thắng 10 lần)",
                            );
                            this.socketService.notifyEvent(
                                userId.toString(),
                                "Bạn đã hoàn thành nhiệm vụ 'Siêu siêu chiến lược gia' (Battle thắng 10 lần)",
                            );
                            break;
                        }
                        case 56: {
                            // 2000 GCoin + 1x Nornal Pack
                            await this.transactionService.createNewTransactionFromSystem(
                                userId,
                                3000,
                                "Hoàn thành nhiệm vụ 'Đam mê Thursday Minigame I' (Tham gia Thursday Minigame 1 lần)",
                            );
                            this.socketService.notifyEvent(
                                userId.toString(),
                                "Bạn đã hoàn thành nhiệm vụ 'Đam mê Thursday Minigame I' (Tham gia Thursday Minigame 1 lần)",
                            );
                            break;
                        }
                        case 57: {
                            // 5000 GCoin  + Mảnh FIGURE2
                            await this.sendItemGIC(
                                this.createGicRewardItem(userId, 'FIGURE2'),
                            );
                            this.gotAPiece(userId, { name: 'FIGURE2', rare: 'SR' });
                            await this.transactionService.createNewTransactionFromSystem(
                                userId,
                                5000,
                                "Hoàn thành nhiệm vụ 'Đam mê Thursday Minigame II' (Tham gia Thursday Minigame 2 lần)",
                            );
                            this.socketService.notifyEvent(
                                userId.toString(),
                                "Bạn đã hoàn thành nhiệm vụ 'Đam mê Thursday Minigame II' (Tham gia Thursday Minigame 2 lần)",
                            );
                            break;
                        }
                        case 58: {
                            // 1000 GCoin
                            await this.transactionService.createNewTransactionFromSystem(
                                userId,
                                1000,
                                "Hoàn thành nhiệm vụ 'Tân binh Thursday Minigame' (Trả lời đúng 5 câu hỏi từ Thursday Minigame)",
                            );
                            this.socketService.notifyEvent(
                                userId.toString(),
                                "Bạn đã hoàn thành nhiệm vụ 'Tân binh Thursday Minigame' (Trả lời đúng 5 câu hỏi từ Thursday Minigame)",
                            );
                            break;
                        }
                        case 59: {
                            // 2000 GCoin
                            await this.transactionService.createNewTransactionFromSystem(
                                userId,
                                2000,
                                "Hoàn thành nhiệm vụ 'Chuyên gia Thursday Minigame' (Trả lời đúng 10 câu hỏi từ Thursday Minigame)",
                            );
                            this.socketService.notifyEvent(
                                userId.toString(),
                                "Bạn đã hoàn thành nhiệm vụ 'Chuyên gia Thursday Minigame' (Trả lời đúng 10 câu hỏi từ Thursday Minigame)",
                            );
                            break;
                        }
                        case 60: {
                            // 5000 GCoin + 1x Premium Pack
                            await this.transactionService.createNewTransactionFromSystem(
                                userId,
                                7000,
                                "Hoàn thành nhiệm vụ 'Quá dễ!' (Lọt top 10 Thursday Minigame)",
                            );
                            this.socketService.notifyEvent(
                                userId.toString(),
                                "Bạn đã hoàn thành nhiệm vụ 'Quá dễ!' (Lọt top 10 Thursday Minigame)",
                            );
                            break;
                        }
                        default: {
                            throw new Error(`Unknown id ${id}`);
                        }
                    }
                    d.achievements.push(id);
                    this.completedAMission(userId);
                }
                d.markModified('achievements');
                await d.save();
            } catch(error) {
                console.log(error)
            }
        });
    }

    public async URLClick(userId: Types.ObjectId, numClicks: number) {
        await this.lock.acquire(userId.toString(), async () => {
            try {
                let docs = await GICAchievementModel.findOne({
                    userId: userId,
                });
                if (!docs) {
                    docs = new GICAchievementModel({
                        userId: userId,
                        achievements: [],
                    });
                }
    
                if (!docs.achievements.includes(54) && numClicks >= 10) {
                    docs.achievements.push(54);
                    // TODO: 5000 GCoins
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        5000,
                        "Hoàn thành nhiệm vụ 'Link hot I' (Shortened link có 10 lượt click)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Link hot I' (Shortened link có 10 lượt click)",
                    );
                    this.completedAMission(userId);
                }
                if (!docs.achievements.includes(55) && numClicks >= 25) {
                    docs.achievements.push(55);
                    // TODO: 10000 GCoins + Premium Pack
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        10000,
                        "Hoàn thành nhiệm vụ 'Link hot II' (Shortened link có 25 lượt click)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Link hot II' (Shortened link có 25 lượt click)",
                    );
                    this.completedAMission(userId);
                }
    
                docs.markModified('achievements');
                await docs.save();
            } catch(error) {
                console.log(error)
            }
        });
    }

    public async URLCreate(userId: Types.ObjectId, urlCount: number) {
        await this.lock.acquire(userId.toString(), async () => {
            try {
                let docs = await GICAchievementModel.findOne({
                    userId: userId,
                });
                if (!docs) {
                    docs = new GICAchievementModel({
                        userId: userId,
                        achievements: [],
                    });
                }
    
                if (!docs.achievements.includes(51) && urlCount >= 1) {
                    docs.achievements.push(51);
                    // TODO: 1000 GCoins
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        1000,
                        "Hoàn thành nhiệm vụ 'Link ngắn tiện lợi I' (Shorten 1 link bằng GDSC URL Shortener trên url.gdsc.app)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Link ngắn tiện lợi I' (Shorten 1 link bằng GDSC URL Shortener trên url.gdsc.app)",
                    );
                    this.completedAMission(userId);
                }
                if (!docs.achievements.includes(52) && urlCount >= 7) {
                    docs.achievements.push(52);
                    // TODO: 2000 GCoins + Normal Pack R
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        2000 + 1000,
                        "Hoàn thành nhiệm vụ 'Link ngắn tiện lợi II' (Shorten 7 link bằng GDSC URL Shortener trên url.gdsc.app)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Link ngắn tiện lợi II' (Shorten 7 link bằng GDSC URL Shortener trên url.gdsc.app)",
                    );
                    this.completedAMission(userId);
                }
                if (!docs.achievements.includes(53) && urlCount >= 15) {
                    docs.achievements.push(53);
                    // TODO: 2000 GCoins + FIGURE4
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        2000,
                        "Hoàn thành nhiệm vụ 'Link ngắn tiện lợi III' (Shorten 15 link bằng GDSC URL Shortener trên url.gdsc.app)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Link ngắn tiện lợi III' (Shorten 15 link bằng GDSC URL Shortener trên url.gdsc.app)",
                    );
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'FIGURE4'),
                    );
                    this.gotAPiece(userId, { name: 'FLASK4', rare: 'LIMITED' });
                    this.completedAMission(userId);
                }
    
                docs.markModified('achievements');
                await docs.save();
            } catch(error) {
                console.log(error)
            }
        });
    }

    public async availableRecieved(userId: Types.ObjectId) {
        await this.lock.acquire(userId.toString(), async () => {
            try {
                let docs = await GICAchievementModel.findOne({
                    userId: userId,
                });
    
                if (!docs) {
                    docs = new GICAchievementModel({
                        userId: userId,
                        achievements: [],
                    });
                }
    
                if (!docs.achievements.includes(44)) {
                    docs.achievements.push(44);
                    // TODO: 2000 GCoin + 1 Normal Pack + CUP3
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        2000 + 1000,
                        "Hoàn thành nhiệm vụ 'Nghiện Math Quiz' (Kiếm 1000 GCoin trong 1 ngày từ Math Quiz)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Nghiện Math Quiz' (Kiếm 1000 GCoin trong 1 ngày từ Math Quiz)",
                    );
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'CUP3'),
                    );
                    this.gotAPiece(userId, { name: 'CUP3', rare: 'SR' });
                    this.completedAMission(userId);
                }
                docs.markModified("achievements")
                await docs.save()
            } catch(error) {
                console.log(error)
            }
        })
    }

    public async mathQuizScore(userId: Types.ObjectId, score: number) {
        await this.lock.acquire(userId.toString(), async () => {
            try {
                let docs = await GICAchievementModel.findOne({
                    userId: userId,
                });
    
                if (!docs) {
                    docs = new GICAchievementModel({
                        userId: userId,
                        achievements: [],
                    });
                }
    
                docs.maxMathQuizScore = Math.max(docs.maxMathQuizScore, score);
    
                if (
                    !docs.achievements.includes(46) &&
                    docs.maxMathQuizScore >= 25
                ) {
                    docs.achievements.push(46);
                    // TODO: 2000 GCoin
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        2000,
                        "Hoàn thành nhiệm vụ 'Tân binh Math Quiz' (Đạt 25 điểm Math Quiz)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Tân binh Math Quiz' (Đạt 25 điểm Math Quiz)",
                    );
                    this.completedAMission(userId);
                }
    
                if (
                    !docs.achievements.includes(47) &&
                    docs.maxMathQuizScore >= 40
                ) {
                    docs.achievements.push(47);
                    // TODO: 5000 GCoin + Mảnh CUP4
                    this.completedAMission(userId);
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        5000,
                        "Hoàn thành nhiệm vụ 'Chuyên gia Math Quiz' (Đạt 40 điểm Math Quiz)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Chuyên gia Math Quiz' (Đạt 40 điểm Math Quiz)",
                    );
                    await this.sendItemGIC(
                        this.createGicRewardItem(userId, 'CUP4'),
                    );
                    this.gotAPiece(userId, { name: 'CUP4', rare: 'SSR' });
                }
    
                if (
                    !docs.achievements.includes(48) &&
                    docs.maxMathQuizScore >= 60
                ) {
                    docs.achievements.push(48);
                    // TODO: 10000 GCoin + 1x Premium Pack
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        10000 + 2000,
                        "Hoàn thành nhiệm vụ 'Bậc thầy Math Quiz' (Đạt 60 điểm Math Quiz)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Bậc thầy Math Quiz' (Đạt 60 điểm Math Quiz)",
                    );
                    this.completedAMission(userId);
                }
    
                if (
                    !docs.achievements.includes(49) &&
                    docs.maxMathQuizScore >= 75
                ) {
                    docs.achievements.push(49);
                    // TODO: 25000 GCoin + 3x Premium Pack
                    await this.transactionService.createNewTransactionFromSystem(
                        userId,
                        25000 + 2000 * 3,
                        "Hoàn thành nhiệm vụ 'Thiên tài Math Quiz' (Đạt 75 điểm Math Quiz)",
                    );
                    this.socketService.notifyEvent(
                        userId.toString(),
                        "Bạn đã hoàn thành nhiệm vụ 'Thiên tài Math Quiz' (Đạt 75 điểm Math Quiz)",
                    );
                    this.completedAMission(userId);
                }
                docs.markModified("achievements")
                await docs.save()
            } catch(error) {
                console.log(error)
            }
        });
    }
}
