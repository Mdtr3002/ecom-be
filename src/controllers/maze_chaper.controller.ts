import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from './controller';

import { Request, Response, ServiceType } from '../types';
import { AuthService, MazeChapterService } from '../services';

@injectable()
export class MazeChapterController extends Controller {
    public readonly router = Router();
    public readonly path = '/maze-chapter';

    constructor(
        @inject(ServiceType.Auth) private authService: AuthService,
        @inject(ServiceType.MazeChapter)
        private mazeChapterService: MazeChapterService,
    ) {
        super();

        this.router.all('*', this.authService.authenticate());
        this.router.post('/', this.createNewChapter.bind(this));
    }

    async createNewChapter(req: Request, res: Response) {
        try {
            const { level, help_count, round_levels } = req.body;

            const newChapter = await this.mazeChapterService.createNewChapter(
                level,
                help_count,
                round_levels,
            );
            res.composer.success(newChapter);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }
}
