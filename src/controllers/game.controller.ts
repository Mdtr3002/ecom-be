import { Router } from 'express';
import { inject, injectable } from 'inversify';
import _, { random } from 'lodash';

import { Request, Response, ServiceType } from '../types';
import { Controller } from './controller';
import {
    AuthService,
    ItemService,
    MarketplaceItemService,
    TransactionService,
    UserService,
} from '../services';
import passport from 'passport';
import { UserDocument } from '../models/user.model';
import { GameService } from '../services';
import { ErrorInvalidData } from '../lib/errors';
import { ItemDocument } from '../models/item.model';
import { BOX_PRICE, GIFT_THRESHOLD, SYSTEM_ACCOUNT_ID } from '../config';
import RandomPool from '../models/random_pool.model';
import BookFair from '../models/book_fair';
import { generateGameField } from '../game/game-logic';
import levels from '../game/levels.json';
import { LevelInfo } from '../models/game_session.modal';
import mongoose, { Types } from 'mongoose';
@injectable()
export class GameController extends Controller {
    public readonly router = Router();
    public readonly path = '/game';

    constructor(
        @inject(ServiceType.Auth) private authService: AuthService,
        @inject(ServiceType.Game) private gameService: GameService,
        @inject(ServiceType.User) private userService: UserService,
        @inject(ServiceType.Item) private itemService: ItemService,
        @inject(ServiceType.Transaction)
        private transactionService: TransactionService,
    ) {
        super();

        // Confing child routes
        this.router.post(
            '/public/session',
            this.createNewSessionWithoutLogin.bind(this),
        );
        this.router.post(
            '/public/session/:sessionId/next',
            this.nextLevelWithoutLogin.bind(this),
        );
        this.router.get(
            '/public/session/:sessionId',
            this.getSessionById.bind(this),
        );

        // Force authenticate all routes
        this.router.all('*', this.authService.authenticate());
        this.router.post('/private/session', this.createNewSession.bind(this));
        this.router.post(
            '/private/session/:sessionId/finish',
            this.finishSession.bind(this),
        );
        this.router.post(
            '/private/session/:sessionId/next',
            this.nextLevel.bind(this),
        );
        this.router.post('/private/box', this.openMysteryBox.bind(this));
        this.router.get('/private/session', this.getUserSessions.bind(this));
        this.router.post('/private/gift', this.scanBookFairQr.bind(this));
    }

    async createNewSessionWithoutLogin(req: Request, res: Response) {
        try {
            let newSession =
                await this.gameService.createGameSessionWithoutUser();
            res.composer.success(newSession);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async createNewSession(req: Request, res: Response) {
        try {
            let user = req.user as UserDocument;

            let newSession =
                await this.gameService.createGameSessionWithUserLogin(user.id);
            res.composer.success(newSession);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getSessionById(req: Request, res: Response) {
        try {
            const { sessionId } = req.params;

            let newSession = await this.gameService.getSessionById(
                new Types.ObjectId(sessionId),
            );
            res.composer.success(newSession);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async nextLevel(req: Request, res: Response) {
        try {
            // const { sessionId } = req.params;

            // let user = req.user as UserDocument;

            // let newSession = await this.gameService.nextLevel(
            //     user.id,
            //     sessionId,
            // );
            res.composer.success('');
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async nextLevelWithoutLogin(req: Request, res: Response) {
        try {
            const { sessionId } = req.params;

            let newSession = await this.gameService.nextLevelWithoutLogin(
                new Types.ObjectId(sessionId),
            );
            res.composer.success(newSession);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async finishSession(req: Request, res: Response) {
        try {
            const { sessionId } = req.params;

            let newSession = await this.gameService.finishSession(sessionId);
            res.composer.success(newSession);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    // TODO: EXTRACT TO SERVICES
    async openMysteryBox(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const balance = await this.userService.getUserBalance(userId);
            if (balance < BOX_PRICE) {
                throw new ErrorInvalidData('Not enough balance');
            }

            const randomPool = await RandomPool.findOne();

            function getRandomIndex(min: number = 0, max: number) {
                return Math.round(Math.random() * (max - min) + min);
            }

            const idx = getRandomIndex(0, randomPool.itemIds.length);
            const item = await this.itemService.getItemById(
                new mongoose.Types.ObjectId(randomPool.itemIds[idx]),
            );
            item.ownerId = userId;
            await item.save();
            const newTransaction =
                await this.transactionService.createNewTransaction(
                    userId,
                    SYSTEM_ACCOUNT_ID,
                    BOX_PRICE,
                    'Buy mystery box',
                );
            res.composer.success(item);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getUserSessions(req: Request, res: Response) {
        try {
            const userId = req.tokenMeta.userId.toString();
            const sessions = await this.gameService.getUserSessions(userId);
            res.composer.success(sessions);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async scanBookFairQr(req: Request, res: Response) {
        try {
            const { userId } = req.body;
            if (!userId) {
                res.composer.badRequest('Lack userId');
                return;
            }

            const sessions = await this.gameService.getUserSessions(userId);
            if (sessions.length === 0) {
                res.composer.badRequest('You have not played any game');
                return;
            }

            if (sessions[0].level < GIFT_THRESHOLD) {
                res.composer.badRequest(
                    `You have not reached level ${GIFT_THRESHOLD} to claim a gift`,
                );
                return;
            }

            const hasClaimedGift = await BookFair.findOne({ userId });
            if (hasClaimedGift) {
                res.composer.badRequest('You have claimed the gift');
                return;
            }

            const newGift = new BookFair({
                userId,
                level: sessions[0].level,
                claimAt: Date.now(),
            });
            await newGift.save();
            res.composer.success('Success');
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }
}
