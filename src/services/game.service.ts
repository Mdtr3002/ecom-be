import { injectable, inject } from 'inversify';
import _ from 'lodash';

import { DatabaseService } from './database.service';
import User from '../models/user.model';
import { ErrorUserInvalid } from '../lib/errors';

import { ServiceType } from '../types';
import { UserDocument } from '../models/user.model';
import GameSession, {
    GameSessionDocument,
    LevelInfo,
} from '../models/game_session.modal';
import levels from '../game/levels.json';
import { generateGameField } from '../game/game-logic';
import { Types } from 'mongoose';

let INIT_LEVEL = 0;
@injectable()
export class GameService {
    constructor(
        @inject(ServiceType.Database) private dbService: DatabaseService, // @inject(ServiceType.Bundle) private bundleService: BundleService, // @inject(ServiceType.Mail) private mailService: MailService,
    ) {}

    async createGameSessionWithoutUser(): Promise<GameSessionDocument> {
        let levelInfo: LevelInfo = levels[INIT_LEVEL];
        const { field, hiddenCells } = generateGameField(
            levelInfo.cellCount,
            levelInfo.memoryCount,
        );
        levelInfo = { ...levelInfo, field, hiddenCells };

        let newGameSession = new GameSession();
        newGameSession.level = 1;
        newGameSession.levelInfo = levelInfo;
        newGameSession.createdAt = Date.now();
        await newGameSession.save();
        return newGameSession;
    }

    async createGameSessionWithUserLogin(
        userId: string,
    ): Promise<GameSessionDocument> {
        let levelInfo: LevelInfo = levels[INIT_LEVEL];
        const { field, hiddenCells } = generateGameField(
            levelInfo.cellCount,
            levelInfo.memoryCount,
        );
        levelInfo = { ...levelInfo, field, hiddenCells };

        let newGameSession = new GameSession();
        newGameSession.level = 1;
        newGameSession.levelInfo = levelInfo;
        newGameSession.createdAt = Date.now();
        newGameSession.userId = userId;
        await newGameSession.save();
        return newGameSession;
    }

    async findUserGameSession(userId: string): Promise<GameSessionDocument> {
        let gameSession = await GameSession.find(
            { userId: userId },
            { sort: { created_at: 1 } },
        );

        return gameSession.length > 0 ? gameSession[0] : null;
    }

    async find(sessionId: string): Promise<GameSessionDocument> {
        let gameSession = await GameSession.findById(sessionId);

        return gameSession;
    }

    async endSessionGame(sessionId: Types.ObjectId): Promise<Number> {
        let gameSession = await GameSession.findById(sessionId);
        if (!gameSession) return;
        if (gameSession.finishAt) return;

        gameSession.finishAt = Date.now();
        // let user = await User.findById(gameSession.userId);

        if (gameSession.level === 1) {
            gameSession.save();
            return;
        }
        // user.balance = user.balance + gameSession.level;
        gameSession.save();
        // user.save();

        return 100;
    }

    async updateUserBalanceInGame(
        userId: string,
        score: number,
    ): Promise<Number> {
        let user = await User.findById(userId);
        if (user.highestScoreMathQuiz < score) {
            user.highestScoreMathQuiz = score / 10;
        }
        user.balance = user.balance + score / 10;
        user.save();

        return user.balance;
    }

    async findTopRanking(): Promise<UserDocument[]> {
        let users = await User.find()
            .sort({ highestScoreMathQuiz: -1 })
            .limit(15)
            .select(['highestScoreMathQuiz', 'email', 'picture', 'name']);

        return users;
    }

    async findTopRankingDiscord(): Promise<UserDocument[]> {
        let users = await User.find()
            .sort({ highestScoreMathQuiz: -1 })
            .limit(15);

        return users;
    }

    // async ChooseField(
    //     gameSession: GameSessionDocument,
    //     cellId: number,
    // ): Promise<Number[]> {
    //     if (gameSession.finishAt) return;

    //     gameSession.chooseFields.push(cellId);

    //     return gameSession.chooseFields;
    // }

    async nextLevel(
        userId: string,
        gameSession: GameSessionDocument,
    ): Promise<GameSessionDocument> {
        if (gameSession.userId != userId) {
            throw new ErrorUserInvalid('Missing input fields');
        }

        let levelInfo: LevelInfo = levels[gameSession.level + 1];
        const { field, hiddenCells } = generateGameField(
            levelInfo.cellCount,
            levelInfo.memoryCount,
        );
        levelInfo = { ...levelInfo, field, hiddenCells };
        gameSession.chooseFields = [];
        gameSession.level = gameSession.level + 1;
        gameSession.levelInfo = levelInfo;
        await gameSession.save();
        return gameSession;
    }

    async getSessionById(
        sessionId: Types.ObjectId,
    ): Promise<GameSessionDocument> {
        let newGameSession = await GameSession.findById(sessionId);
        return newGameSession;
    }

    async nextLevelWithoutLogin(
        sessionId: Types.ObjectId,
    ): Promise<GameSessionDocument> {
        let newGameSession = await GameSession.findById(sessionId);
        if (newGameSession.userId) {
            throw new ErrorUserInvalid('Missing input fields');
        }
        newGameSession.level = newGameSession.level + 1;
        await newGameSession.save();
        return newGameSession;
    }

    async finishSession(sessionId: string): Promise<GameSessionDocument> {
        let newGameSession = await GameSession.findById(sessionId);
        newGameSession.finishAt = Date.now();
        await newGameSession.save();
        return newGameSession;
    }

    async getUserSessions(userId: string): Promise<GameSessionDocument[]> {
        const sessions = await GameSession.find({ userId }, { level: -1 });
        return sessions;
    }
}
