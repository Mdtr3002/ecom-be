import { Router } from 'express';
import { inject, injectable } from 'inversify';
import _, { random } from 'lodash';

import { Request, Response, ServiceType } from '../types';
import { Controller } from './controller';
import {
    AuthService,
    ClubDayService,
    ItemService,
    MarketplaceItemService,
    TransactionService,
    UserService,
} from '../services';
import passport from 'passport';
import { UserDocument, USER_ROLES } from '../models/user.model';
import { GameService } from '../services';
import { ErrorInvalidData } from '../lib/errors';
import { ItemDocument } from '../models/item.model';
import { BOX_PRICE, GIFT_THRESHOLD, SYSTEM_ACCOUNT_ID } from '../config';
import RandomPool from '../models/random_pool.model';
import BookFair from '../models/book_fair';
import { generateGameField } from '../game/game-logic';
import levels from '../game/levels.json';
import { LevelInfo } from '../models/game_session.modal';
import bodyParser from 'body-parser';
import { Reward } from '../models/club_day';
import { Types } from 'mongoose';
@injectable()
export class ClubDayController extends Controller {
    public readonly router = Router();
    public readonly path = '/clubday';

    constructor(
        @inject(ServiceType.Auth) private authService: AuthService,
        @inject(ServiceType.Game) private gameService: GameService,
        @inject(ServiceType.User) private userService: UserService,
        @inject(ServiceType.Item) private itemService: ItemService,
        @inject(ServiceType.ClubDay) private clubdayService: ClubDayService,
    ) {
        super();

        // Force authenticate all routes
        this.router.all('*', this.authService.authenticate());
        this.router.get('/private/', this.getClubDay.bind(this));
        this.router.post('/private/', this.createClubDay.bind(this));
        this.router.patch('/private/', this.updateClubDay.bind(this));
        this.router.post('/private/verify', this.verifyGame.bind(this));
        this.router.get(
            '/private/received/all',
            this.getAllReceivedClubDay.bind(this),
        );
        this.router.get('/private/reward', this.getAvailableReward.bind(this));
        this.router.post('/private/reward', this.receivedReward.bind(this));
        this.router.get('/private/maze/verify', this.canPlayMaze.bind(this));
        this.router.post(
            '/private/maze/finish',
            this.updateMazeResult.bind(this),
        );
    }

    async getClubDay(req: Request, res: Response) {
        try {
            let clubDay = await this.clubdayService.getUserClubDay(
                req.tokenMeta.userId.toString(),
            );

            res.composer.success(clubDay);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async createClubDay(req: Request, res: Response) {
        try {
            let userClubday = await this.clubdayService.getUserClubDay(
                req.tokenMeta.userId.toString(),
            );
            if (userClubday) {
                res.composer.badRequest('');
                return;
            }

            if (!req.body.name || !req.body.studentId) {
                throw Error('Miss Field');
            }

            var clubDay = await this.clubdayService.createClubDay(
                req.tokenMeta.userId.toString(),
                req.body.name,
                req.body.studentId,
            );

            res.composer.success(clubDay);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async updateClubDay(req: Request, res: Response) {
        try {
            let userClubday = await this.clubdayService.getUserClubDay(
                req.tokenMeta.userId.toString(),
            );
            if (!userClubday) {
                res.composer.badRequest('');
                return;
            }
            var clubDay = await this.clubdayService.updateClubDay(
                req.tokenMeta.userId.toString(),
                req.body?.name,
                req.body?.studentId,
            );

            res.composer.success(clubDay);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async canPlayMaze(req: Request, res: Response) {
        try {
            if (
                !_.includes(
                    req.tokenMeta.roles,
                    USER_ROLES.STAFF_CLUBDAY_VERIFY,
                )
            ) {
                throw Error('You are not Staff of Club Day');
            }

            const userId = req.query.userId.toString();

            const canPlay = await this.clubdayService.verifyMazeGame(userId);

            res.composer.success(canPlay);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async updateMazeResult(req: Request, res: Response) {
        try {
            if (
                !_.includes(
                    req.tokenMeta.roles,
                    USER_ROLES.STAFF_CLUBDAY_VERIFY,
                )
            ) {
                throw Error('You are not Staff of Club Day');
            }

            const userId = req.body.userId;

            await this.clubdayService.updateFinishMaze(userId);

            res.composer.success({ isFinishMaze: true });
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async verifyGame(req: Request, res: Response) {
        try {
            console.log('Staff CLub day', req.tokenMeta);
            console.log(
                'Staff CLub day',
                _.includes(
                    req.tokenMeta.roles,
                    USER_ROLES.STAFF_CLUBDAY_VERIFY,
                ),
            );
            if (
                !_.includes(
                    req.tokenMeta.roles,
                    USER_ROLES.STAFF_CLUBDAY_VERIFY,
                )
            ) {
                throw Error('You are not Staff of Club Day');
            }

            let clubDay;
            if (req.body.type === 'key_matching')
                clubDay = await this.clubdayService.verifyKeyMatching(
                    req.body.userId,
                );
            else
                clubDay = await this.clubdayService.verifyCheckIn(
                    req.body.userId,
                );
            res.composer.success('Success');
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getAllReceivedClubDay(req: Request, res: Response) {
        try {
            if (
                !_.includes(req.tokenMeta.roles, USER_ROLES.STAFF_CLUBDAY_GIFT)
            ) {
                throw Error('You are not Staff of Club Day');
            }
            let clubDay = await this.clubdayService.getAllReceivedClubDay();

            res.composer.success(clubDay);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getAvailableReward(req: Request, res: Response) {
        try {
            if (
                !_.includes(req.tokenMeta.roles, USER_ROLES.STAFF_CLUBDAY_GIFT)
            ) {
                throw Error('You are not Staff of Club Day');
            }
            let clubDay = await this.clubdayService.getUserClubDay(
                req.query.userId.toString(),
            );

            if (!clubDay) throw Error('User Clubday not existed');

            let reward: Array<Array<Reward>>;
            let count = 0;
            if (clubDay.isFinishGame) count++;
            if (clubDay.isFinishMathQuiz) count++;
            if (clubDay.isFinishKeyMatching) count++;
            if (clubDay.isFinishCheckIn) count++;

            if (count == 0) reward = [];
            else if (count == 1)
                reward = [
                    [
                        { type: 'sticker', quantity: 2 },
                        { type: 'bracelet', quantity: 1 },
                    ],
                ];
            else if (count == 2)
                reward = [
                    [
                        { type: 'sticker', quantity: 2 },
                        { type: 'bracelet', quantity: 1 },
                        { type: 'keychain', quantity: 1 },
                    ],
                ];
            else if (count == 3)
                reward = [
                    [
                        { type: 'sticker', quantity: 2 },
                        { type: 'bracelet', quantity: 1 },
                        { type: 'keychain', quantity: 1 },
                        { type: 'tote bag', quantity: 1 },
                    ],
                ];
            else if (count == 4)
                reward = [
                    [
                        { type: 'sticker', quantity: 2 },
                        { type: 'bracelet', quantity: 1 },
                        { type: 'keychain', quantity: 1 },
                        { type: 'tote bag', quantity: 1 },
                        { type: 'lanyard', quantity: 1 },
                    ],
                ];

            res.composer.success(reward);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async receivedReward(req: Request, res: Response) {
        try {
            if (
                !_.includes(req.tokenMeta.roles, USER_ROLES.STAFF_CLUBDAY_GIFT)
            ) {
                throw Error('You are not Staff of Club Day');
            }
            let clubDay = await this.clubdayService.getUserClubDay(
                req.body.userId,
            );

            if (clubDay.claimAt) {
                throw Error('Error user received');
            }

            let reward: Array<Array<Reward>>;
            let count = 0;
            if (clubDay.isFinishGame) count++;
            if (clubDay.isFinishMathQuiz) count++;
            if (clubDay.isFinishKeyMatching) count++;
            if (clubDay.isFinishCheckIn) count++;

            if (count == 0) reward = [];
            else if (count == 1)
                reward = [
                    [
                        { type: 'sticker', quantity: 2 },
                        { type: 'bracelet', quantity: 1 },
                    ],
                ];
            else if (count == 2)
                reward = [
                    [
                        { type: 'sticker', quantity: 2 },
                        { type: 'bracelet', quantity: 1 },
                        { type: 'keychain', quantity: 1 },
                    ],
                ];
            else if (count == 3)
                reward = [
                    [
                        { type: 'sticker', quantity: 2 },
                        { type: 'bracelet', quantity: 1 },
                        { type: 'keychain', quantity: 1 },
                        { type: 'tote bag', quantity: 1 },
                    ],
                ];
            else if (count == 4)
                reward = [
                    [
                        { type: 'sticker', quantity: 2 },
                        { type: 'bracelet', quantity: 1 },
                        { type: 'keychain', quantity: 1 },
                        { type: 'tote bag', quantity: 1 },
                        { type: 'lanyard', quantity: 1 },
                    ],
                ];

            if (req.body.option > reward.length) throw Error('Error received');

            clubDay.gifts = reward[req.body.option];
            clubDay.claimAt = Date.now();
            await clubDay.save();
            res.composer.success(clubDay);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }
}
