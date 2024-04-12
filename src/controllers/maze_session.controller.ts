import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from './controller';

import { Request, Response, ServiceType } from '../types';
import { AuthService, MazeService } from '../services';
import mongoose, { Types } from 'mongoose';
import _ from 'lodash';
import { USER_ROLES } from '../models/user.model';

@injectable()
export class MazeSessionController extends Controller {
    public readonly router = Router();
    public readonly path = '/maze-session';

    constructor(
        @inject(ServiceType.Auth) private authService: AuthService,
        @inject(ServiceType.Maze) private mazeService: MazeService,
    ) {
        super();

        this.router.all('*', this.authService.authenticate());
        this.router.post('/', this.createSession.bind(this));
        this.router.get('/current', this.getCurrentSession.bind(this));
        this.router.post('/:id/move', this.submitSingleMove.bind(this));
        this.router.post('/:id/moves', this.submitMultipleMoves.bind(this));
        this.router.get('/:id/character', this.getCharacterInfo.bind(this));
        this.router.get('/:id/map', this.getMapInfo.bind(this));
        this.router.get('/:id/move', this.getMovesHistory.bind(this));
        this.router.post('/:id/end', this.endSession.bind(this));
        this.router.get('/:id/score', this.getRoundScore.bind(this));
    }

    async createSession(req: Request, res: Response) {
        try {
            console.log(req.tokenMeta);
            if (
                !_.includes(
                    req.tokenMeta.roles,
                    USER_ROLES.STAFF_CLUBDAY_VERIFY,
                )
            ) {
                throw Error('You are not Staff of Club Day');
            }

            const userId = new Types.ObjectId(req.body.userId);

            const session = await this.mazeService.createSession(userId, 1);
            res.composer.success(session);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getCurrentSession(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);

            const session = await this.mazeService.getCurrentSession(userId);
            res.composer.success(session);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async submitSingleMove(req: Request, res: Response) {
        try {
            const sessionId = new mongoose.Types.ObjectId(req.params.id);
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const { move } = req.body;

            const result = await this.mazeService.submitSingleMove(
                sessionId,
                userId,
                move,
            );

            res.composer.success(result);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getCharacterInfo(req: Request, res: Response) {
        try {
            const sessionId = new mongoose.Types.ObjectId(req.params.id);
            const userId = new Types.ObjectId(req.tokenMeta.userId);

            const characterInfo = await this.mazeService.getCharacterInfo(
                sessionId,
                userId,
            );

            res.composer.success(characterInfo);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getMapInfo(req: Request, res: Response) {
        try {
            const sessionId = new mongoose.Types.ObjectId(req.params.id);
            const userId = new Types.ObjectId(req.tokenMeta.userId);

            const mapInfo = await this.mazeService.getMapInfo(
                sessionId,
                userId,
            );

            res.composer.success(mapInfo);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getMovesHistory(req: Request, res: Response) {
        try {
            const sessionId = new mongoose.Types.ObjectId(req.params.id);
            const userId = new Types.ObjectId(req.tokenMeta.userId);

            const movesHistory = await this.mazeService.getMovesHistory(
                sessionId,
                userId,
            );

            res.composer.success(movesHistory);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async endSession(req: Request, res: Response) {
        try {
            const sessionId = new mongoose.Types.ObjectId(req.params.id);
            const userId = new Types.ObjectId(req.tokenMeta.userId);

            const session = await this.mazeService.endMazeSession(
                sessionId,
                userId,
            );

            res.composer.success(session);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async submitMultipleMoves(req: Request, res: Response) {
        try {
            const sessionId = new mongoose.Types.ObjectId(req.params.id);
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const moves: string[] = req.body.moves;
            const canUseHelp: boolean = req.body.is_enable_animation;

            const result = await this.mazeService.submitMultipleMove(
                sessionId,
                userId,
                moves,
                canUseHelp,
            );

            res.composer.success(result);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getRoundScore(req: Request, res: Response) {
        try {
            const roundId = new Types.ObjectId(req.params.id);

            const result = await this.mazeService.getScore(roundId);

            res.composer.success(result);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }
}
