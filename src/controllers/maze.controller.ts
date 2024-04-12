import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from './controller';

import { Request, Response, ServiceType } from '../types';
import { AuthService, MazeService } from '../services';
import mongoose, { Schema, Types } from 'mongoose';

@injectable()
export class MazeController extends Controller {
    public readonly router = Router();
    public readonly path = '/maze';

    constructor(
        @inject(ServiceType.Auth) private authService: AuthService,
        @inject(ServiceType.Maze) private mazeService: MazeService,
    ) {
        super();

        this.router.all('*', this.authService.authenticate());
        this.router.post('/', this.createNewMap.bind(this));
    }

    async createNewMap(req: Request, res: Response) {
        try {
            const { level } = req.body;
            const newMap = await this.mazeService.createMap(level);
            res.composer.success(newMap);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }
}
