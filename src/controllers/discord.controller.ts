import { Router } from 'express';
import { inject, injectable } from 'inversify';
import _, { random } from 'lodash';

import { Request, Response, ServiceType } from '../types';
import { Controller } from './controller';
import {
    AuthService,
    ClubDayService,
    DiscordService,
    ItemService,
    MarketplaceItemService,
    TransactionService,
    UserService,
} from '../services';
import passport from 'passport';
import { UserDocument, USER_ROLES } from '../models/user.model';
import { GameService } from '../services';
import { Reward } from '../models/club_day';
import { SYSTEM_ACCOUNT_ID } from '../config';
import { randomIntFromInterval } from '../lib/helper';
import { Types } from 'mongoose';
import Leaderboard from '../models/leaderboard.model';
@injectable()
export class DiscordController extends Controller {
    public readonly router = Router();
    public readonly path = '/discord';

    constructor(
        @inject(ServiceType.Auth) private authService: AuthService,
        @inject(ServiceType.Game) private gameService: GameService,
        @inject(ServiceType.User) private userService: UserService,
        @inject(ServiceType.Item) private itemService: ItemService,
        @inject(ServiceType.ClubDay) private clubdayService: ClubDayService,
        @inject(ServiceType.Discord) private discordService: DiscordService,
        @inject(ServiceType.Transaction)
        private transactionService: TransactionService,
    ) {
        super();

        // Force authenticate all routes
        this.router.all('*', this.authService.authenticate());
        this.router.get('/public/board', this.discordLeaderboard.bind(this));
        this.router.get(
            '/private/:discordId',
            this.getDiscordActivityInformation.bind(this),
        );
        this.router.get(
            '/private/users/:discordId',
            this.getUserInfo.bind(this),
        );
        this.router.post('/private/daily', this.discordDaily.bind(this));
        this.router.post('/private/work', this.discordWork.bind(this));
        this.router.post('/private/battle/start', this.startBattle.bind(this));
        this.router.post('/private/battle/end', this.endBattle.bind(this));
    }

    async getDiscordActivityInformation(req: Request, res: Response) {
        try {
            const { discordId } = req.params;
            if (!discordId) {
                throw Error('Miss Discord ID');
            }
            let dis = await this.discordService.getDiscordActivity(
                req.params.discordId,
            );
            if (!dis) {
                throw Error(
                    'DiscordId not existed, user may need to connect to GDSC Game by /connect <email>',
                );
            }

            res.composer.success(dis);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async discordDaily(req: Request, res: Response) {
        try {
            const { discordId } = req.body;
            if (!discordId) {
                throw Error('Miss Discord ID');
            }
            let dis = await this.discordService.getDiscordActivity(
                req.body.discordId,
            );
            if (!dis) {
                throw Error(
                    'DiscordId not existed, user may need to connect to GDSC Game by /connect <email>',
                );
            }
            if (dis.isDaily) {
                res.composer.success({
                    isSuccess: false,
                    isDaily: true,
                });
                return;
            }
            const { streak } = dis;
            let coin = 0;
            coin = randomIntFromInterval((streak + 1) * 5, (streak + 1) * 10);
            await this.transactionService.createNewTransactionByDiscordId(
                SYSTEM_ACCOUNT_ID,
                discordId,
                coin,
                `You receive ${coin} from discord daily`,
            );
            dis.isDaily = true;
            dis.streak = dis.streak + 1;
            dis.save();
            res.composer.success({
                isSuccess: true,
                coin: coin,
                isDaily: true,
            });
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async discordWork(req: Request, res: Response) {
        try {
            const { discordId } = req.body;
            if (!discordId) {
                throw Error('Miss Discord ID');
            }
            let dis = await this.discordService.getDiscordActivity(
                req.body.discordId,
            );
            if (!dis) {
                throw Error(
                    'DiscordId not existed, user may need to connect to GDSC Game by /connect <email>',
                );
            }
            if (Date.now() - dis.lastWorkAt < 3600000) {
                var diff = 3600000 - Date.now() - dis.lastWorkAt;

                var days = Math.floor(diff / (1000 * 60 * 60 * 24));
                diff -= days * (1000 * 60 * 60 * 24);

                var hours = Math.floor(diff / (1000 * 60 * 60));
                diff -= hours * (1000 * 60 * 60);

                var mins = Math.floor(diff / (1000 * 60));
                diff -= mins * (1000 * 60);

                var seconds = Math.floor(diff / 1000);
                diff -= seconds * 1000;
                res.composer.success({
                    isSuccess: false,
                    lastWorkat: dis.lastWorkAt,
                });
                return;
            }
            let coin = 0;
            coin = randomIntFromInterval(50, 150);
            await this.transactionService.createNewTransactionByDiscordId(
                SYSTEM_ACCOUNT_ID,
                discordId,
                coin,
                `You receive ${coin} from discord work`,
            );
            dis.lastWorkAt = Date.now();
            dis.save();
            res.composer.success({
                isSuccess: true,
                coin: coin,
                lastWorkat: dis.lastWorkAt,
            });
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async startBattle(req: Request, res: Response) {
        try {
            const { player1DiscordId, player2DiscordId, point } = req.body;
            if (!player1DiscordId || !player2DiscordId || !point) {
                throw Error('Miss field');
            }
            let battle = await this.discordService.createBattle(
                player1DiscordId,
                player2DiscordId,
                point,
            );
            res.composer.success({
                isSuccess: true,
                battle,
            });
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async endBattle(req: Request, res: Response) {
        try {
            const { winnerDiscordID, battleId } = req.body;
            if (!winnerDiscordID || !battleId) {
                throw Error('Miss field');
            }
            let battle = await this.discordService.endBattle(
                new Types.ObjectId(battleId),
                winnerDiscordID,
            );
            res.composer.success({
                isSuccess: true,
                battle,
            });
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getUserInfo(req: Request, res: Response) {
        try {
            const { discordId } = req.params;
            if (!discordId) {
                throw Error('Miss Discord ID');
            }
            let dis = await this.userService.getUserInfoByDiscordId(discordId);
            if (!dis) {
                throw Error(
                    'DiscordId not existed, user may need to connect to GDSC Game by /connect <email>',
                );
            }

            res.composer.success(dis);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async discordLeaderboard(req: Request, res: Response) {
        try {
            const leaderboard = await Leaderboard.find()
                .sort({ createdAt: -1 })
                .limit(1);
            res.composer.success(leaderboard);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }
}
