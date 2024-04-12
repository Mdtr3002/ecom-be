import _ from 'lodash';
import { EventTypes } from './event-types';
import {
    GameService,
    ItemService,
    MazeService,
    TransactionService,
} from '../services';
import { ClubDayService, UserService } from '../services';

import levels from '../game/levels.json';
import { generateGameField } from '../game/game-logic';
import { LevelInfo } from '../models/game_session.modal';
import { Socket } from 'socket.io';
import { ConnectedUser, CustomSocket } from '.';
import { UserDocument, USER_ROLES } from '../models/user.model';
import mongoose, { Types } from 'mongoose';
import { SYSTEM_ACCOUNT_ID } from '../config';
import expressionToSVG from '../game/math-quiz/expressionToSVG';
import { ItemDocument } from '../models/item.model';
import { GICService } from '../services/gic/gic.service';
import { mathQuizRarity } from '../services/gic/utils';
import { GICAchievementService } from '../services/gic/gic_achievement.service';
const MAX_CHAPTER = 50;

export interface SocketInfo {
    socket: CustomSocket;
    socketId: string;
    sessionId: Types.ObjectId;
    levelQuiz: number;
    scoreQuiz: number;
    isQuizStart: boolean;
    isQuizTrue: boolean;
    questionTime: number;
    quizTimeout: ReturnType<typeof setTimeout>;
}

type SocketMapType = {
    [socketId: string]: SocketInfo;
};

class ClientUser {
    private sockets: SocketMapType;
    private userId: any;
    private gameService: GameService;
    private clubDayService: ClubDayService;
    private MathQuizRanking: UserDocument[];
    private userService: UserService;
    private userData: UserDocument;
    private transactionService: TransactionService;
    private itemService: ItemService;
    private gicAchievementService: GICAchievementService;
    private gicService: GICService;
    private mazeService: MazeService;

    constructor(
        userId: string,
        gameService: GameService,
        clubDayService: ClubDayService,
        userService: UserService,
        transactionService: TransactionService,
        itemService: ItemService,
        gicAchievementService: GICAchievementService,
        gicService: GICService,
        mazeService: MazeService,
    ) {
        this.sockets = [] as any;
        this.userId = [] as any;
        this.userId = userId;
        this.gameService = gameService;
        this.clubDayService = clubDayService;
        this.MathQuizRanking = [];
        this.userService = userService;
        this.transactionService = transactionService;
        this.itemService = itemService;
        this.gicAchievementService = gicAchievementService;
        this.gicService = gicService;
        this.mazeService = mazeService;
        const userIdCast = new mongoose.Types.ObjectId(userId);
        this.userService
            .findById(userIdCast)
            .then((user) => (this.userData = user));
        // thisUserService(userId).then((data: any) => (this.userData = data));
        this.onDisconnect = this.onDisconnect.bind(this);
    }

    async SyncMathQuizRanking(
        socket: CustomSocket,
        mathQuizRanking: UserDocument[],
    ) {
        const MathQuizRanking = await this.gameService.findTopRanking();
        if (MathQuizRanking === mathQuizRanking) return;
        this.MathQuizRanking = MathQuizRanking;
        socket.emit(EventTypes.MATH_QUIZ_RANKING, MathQuizRanking);
    }

    //#region game flip
    async createNewSessionGame(socketId: any) {
        let newSession = await this.gameService.createGameSessionWithUserLogin(
            this.userId,
        );
        this.sockets[socketId].sessionId = newSession._id;
        this.sockets[socketId].socket.emit(
            EventTypes.RECEIVE_NEW_GAME_SESSION,
            newSession,
        );
        this.sockets[socketId].socket.emit(EventTypes.NOTIFY, {
            type: 'success',
            message: 'Start game success',
        });
    }

    async onClickCell(socketId: any, cellId: any) {
        let gameSession = await this.gameService.getSessionById(
            this.sockets[socketId].sessionId,
        );

        if (gameSession.finishAt || gameSession.userId != this.userId) return;

        let isCorrect = _.includes(gameSession.levelInfo.hiddenCells, cellId);

        if (!isCorrect) {
            let userBalance = await this.gameService.endSessionGame(
                gameSession._id,
            );
            this.sockets[socketId].socket.emit(
                EventTypes.END_SESSION_GAME,
                userBalance,
            );
        }

        if (_.includes(gameSession.chooseFields, cellId)) return;

        gameSession.chooseFields.push(cellId);

        if (
            gameSession.chooseFields.length ===
            gameSession.levelInfo.hiddenCells.length
        ) {
            let newLevelGame = await this.gameService.nextLevel(
                this.userId,
                gameSession,
            );
            this.sockets[socketId].socket.emit(
                EventTypes.NEXT_LEVEL_GAME,
                newLevelGame,
            );
            if (gameSession.level === 21)
                try {
                    await this.clubDayService.verifyGame(gameSession.userId);
                    this.sockets[socketId].socket.emit(EventTypes.NOTIFY, {
                        type: 'success',
                        message:
                            'You have pass first 20 level and claim reward from Club Day',
                    });
                } catch (err) {}
        } else {
            gameSession.save();
        }
    }
    //#endregion

    //#region

    getRandomInt(min: number, max: number) {
        return _.random(min, max);
    }

    async startQuiz(socketId: any, connectedUser: ConnectedUser) {
        this.sockets[socketId].levelQuiz = 1;
        this.sockets[socketId].scoreQuiz = 0;
        this.sockets[socketId].isQuizStart = true;
        let num1 = this.getRandomInt(1, 10);
        let num2 = this.getRandomInt(1, 10);
        let operation = _.sample([true, false]);
        let fake = _.sample([true, false]);
        this.sockets[socketId].isQuizTrue = !fake;

        let fakeAnwser = operation ? num1 + num2 : num1 - num2;
        if (fake) {
            while (fakeAnwser === (operation ? num1 + num2 : num1 - num2))
                fakeAnwser = fakeAnwser + this.getRandomInt(-10, 10);
        }

        this.sockets[socketId].socket.emit(EventTypes.RECEIVE_QUESTION_QUIZ, {
            level: 1,
            question: expressionToSVG(
                `${num1} ${operation ? '+' : '-'} ${num2} = ${fakeAnwser}`,
            ),
            score: 0,
            questionTime: this.calQuestionTimeWithLevel(
                this.sockets[socketId].levelQuiz,
            ),
        });

        this.sockets[socketId].socket.emit(EventTypes.NOTIFY, {
            type: 'success',
            message: 'Start quiz success',
        });
    }

    calMinRangeWithLevel = (level: number) => {
        if (level < 10) {
            return 1;
        }
        if (level < 20) {
            return 10;
        }
        if (level < 30) {
            return 1;
        }
        if (level < 40) {
            return 10;
        }
        if (level < 50) {
            return 10;
        }
        return 10;
    };
    calMaxRangeWithLevel = (level: number) => {
        if (level < 10) {
            return 10;
        }
        if (level < 20) {
            return 20;
        }
        if (level < 30) {
            return 20;
        }
        if (level < 40) {
            return 30;
        }
        if (level < 50) {
            return 60;
        }
        return 100;
    };

    calQuestionTimeWithLevel = (level: number) => {
        if (level < 10) {
            return 3000;
        }
        if (level < 20) {
            return 2500;
        }
        if (level < 30) {
            return 3000;
        }
        if (level < 40) {
            return 2500;
        }
        if (level < 40) {
            return 2000;
        }
        return 2000;
    };

    createQuestion = (level: number, isFake: boolean) => {
        let num1 = this.getRandomInt(
            this.calMinRangeWithLevel(level % MAX_CHAPTER),
            this.calMaxRangeWithLevel(level % MAX_CHAPTER),
        );
        let num2 = this.getRandomInt(
            this.calMinRangeWithLevel(level % MAX_CHAPTER),
            this.calMaxRangeWithLevel(level % MAX_CHAPTER),
        );
        let operation = _.sample(['+', '-', '*', '/']);
        if (level < 20) {
            operation = _.sample(['+', '-']);
        }
        if (operation == '*') {
            while (num1 == 0) num1 = this.getRandomInt(-10, 10);
            while (num2 == 0) num2 = this.getRandomInt(-10, 10);
        }
        if (operation == '/') {
            num1 = num2 * this.getRandomInt(-10, 10);
        }
        let realAnswer = eval(num1 + operation + num2);
        let anwser = eval(num1 + operation + num2);
        if (isFake) {
            if (operation == '/') {
                anwser = anwser + this.getRandomInt(1, 3);
            } else if (operation == '*') {
                if (num2 > num1) {
                    anwser = anwser + num1 * this.getRandomInt(1, 3);
                } else {
                    anwser = anwser + num2 * this.getRandomInt(1, 3);
                }
            } else {
                while (anwser === realAnswer) {
                    anwser = anwser + this.getRandomInt(-10, 10);
                }
            }
        }
        let isAddNum3 = _.sample([true, false]);
        if (level < MAX_CHAPTER || isAddNum3 == false) {
            return expressionToSVG(`${num1} ${operation} ${num2} = ${anwser}`);
        }
        let num3 = this.getRandomInt(
            this.calMinRangeWithLevel(level % MAX_CHAPTER),
            this.calMaxRangeWithLevel(level % MAX_CHAPTER),
        );
        let operation2 = _.sample(['+', '-']);
        realAnswer = eval(realAnswer + operation2 + num3);
        anwser = realAnswer;
        if (isFake) {
            while (anwser === realAnswer) {
                anwser = anwser + this.getRandomInt(-10, 10);
            }
        }
        return expressionToSVG(
            `${num1} ${operation} ${num2} ${operation2} ${num3} = ${anwser}`,
        );
    };

    async answerQuiz(socketId: any, answer: any, connectedUser: ConnectedUser) {
        clearTimeout(this.sockets[socketId].quizTimeout);
        if (answer !== this.sockets[socketId].isQuizTrue) {
            this.sockets[socketId].socket.emit(EventTypes.END_QUIZ, {
                ranking: this.MathQuizRanking,
            });
            this.sockets[socketId].isQuizStart = false;
            await this.transactionService
                .createNewTransactionGame(
                    SYSTEM_ACCOUNT_ID,
                    new Types.ObjectId(this.userId),
                    this.sockets[socketId].scoreQuiz / 10,
                    `You got ${
                        this.sockets[socketId].scoreQuiz / 10
                    }Gcoin from the GDSC Math Quiz`,
                )
                .then(() => {
                    this.sendGICRewardByMathQuiz(
                        socketId,
                        this.userId,
                        this.sockets[socketId].scoreQuiz / 10,
                    );
                    Object.keys(connectedUser).map(
                        (userKey: any, index: any) => {
                            Object.keys(connectedUser[userKey].sockets).map(
                                (key: any, index: any) => {
                                    this.SyncMathQuizRanking(
                                        connectedUser[userKey].sockets[key]
                                            .socket,
                                        connectedUser[userKey].MathQuizRanking,
                                    );
                                },
                            );
                        },
                    );
                });
            this.sockets[socketId].scoreQuiz = 0;
        }
        if (!this.sockets[socketId].isQuizStart) return;

        this.sockets[socketId].levelQuiz = this.sockets[socketId].levelQuiz + 1;
        this.sockets[socketId].scoreQuiz =
            this.sockets[socketId].scoreQuiz + 10;
        let fake = _.sample([true, false]);
        this.sockets[socketId].isQuizTrue = !fake;

        this.sockets[socketId].quizTimeout = setTimeout(() => {
            this.endQuizTimeout(socketId, connectedUser);
        }, this.calQuestionTimeWithLevel(this.sockets[socketId].levelQuiz) + 1500);

        this.sockets[socketId].socket.emit(EventTypes.RECEIVE_QUESTION_QUIZ, {
            level: this.sockets[socketId].levelQuiz,
            question: this.createQuestion(
                this.sockets[socketId].levelQuiz,
                fake,
            ),
            score: this.sockets[socketId].scoreQuiz,
            questionTime: this.calQuestionTimeWithLevel(
                this.sockets[socketId].levelQuiz,
            ),
        });

        if (this.sockets[socketId].levelQuiz === 31)
            try {
                await this.clubDayService.verifyMathQuiz(this.userId);
                this.sockets[socketId].socket.emit(EventTypes.NOTIFY, {
                    type: 'success',
                    message:
                        'You have pass first 30 level and claim reward from Club Day ',
                });
            } catch (err) {}
    }

    async endQuizTimeout(socketId: any, connectedUser: ConnectedUser) {
        if (!this.sockets[socketId].isQuizStart) {
            return;
        }
        clearTimeout(this.sockets[socketId].quizTimeout);
        this.sockets[socketId].socket.emit(EventTypes.END_QUIZ, {
            ranking: this.MathQuizRanking,
        });
        this.sockets[socketId].isQuizStart = false;
        await this.transactionService
            .createNewTransactionGame(
                SYSTEM_ACCOUNT_ID,
                new Types.ObjectId(this.userId),
                this.sockets[socketId].scoreQuiz / 10,
                `You got ${
                    this.sockets[socketId].scoreQuiz / 10
                }Gcoin from the GDSC Math Quiz`,
            )
            .then(() => {
                this.sendGICRewardByMathQuiz(
                    socketId,
                    this.userId,
                    this.sockets[socketId].scoreQuiz / 10,
                );
                Object.keys(connectedUser).map((userKey: any, index: any) => {
                    Object.keys(connectedUser[userKey].sockets).map(
                        (key: any, index: any) => {
                            this.SyncMathQuizRanking(
                                connectedUser[userKey].sockets[key].socket,
                                connectedUser[userKey].MathQuizRanking,
                            );
                        },
                    );
                });
            });
        // trigger
        this.sockets[socketId].scoreQuiz = 0;
    }

    async notifyVoted(connectedUser: ConnectedUser) {
        const data = await this.gicService.getTopVotedTeams();
        console.debug(`data: `, data);
        Object.keys(connectedUser).forEach((userKey) => {
            Object.keys(connectedUser[userKey].sockets).forEach((socketKey) => {
                console.debug(
                    `emitting event to user ${userKey} - socket ${socketKey}`,
                );
                const socket = connectedUser[userKey].sockets[socketKey].socket;
                socket.emit(EventTypes.GIC_VOTE, data);
            });
        });
    }

    //#endregion

    registerSocket(socket: CustomSocket) {
        const defaults: SocketInfo = {
            socket: socket,
            socketId: socket.id,
            sessionId: new Types.ObjectId(),
            levelQuiz: 0,
            scoreQuiz: 0,
            isQuizStart: false,
            isQuizTrue: false,
            questionTime: 2000,
            quizTimeout: null,
        };
        this.sockets[socket.id] = { ...defaults };
        socket.on(EventTypes.DISCONNECT, (reason: any) =>
            this.onDisconnect(socket, reason),
        );
    }

    async sendGICRewardByMathQuiz(
        socketId: string,
        userId: Types.ObjectId,
        score: number,
    ) {
        if (score < 15) return;
        this.gicAchievementService.mathQuizScore(userId, score);
        const item = await this.itemService.sendItemGIC(
            this.itemService.createGicRewardItem(
                userId,
                this.itemService.getRandomItemWithRare(mathQuizRarity),
            ),
        );
        this.sockets[socketId].socket.emit(EventTypes.GIC_REWARD, item);
    }

    notifyClient(data: any) {
        console.log('Notify', data);
        // Object.keys(this.sockets).map((key: any, index: any) => {
        //     this.sockets[key].emit(EventTypes.NOTIFY, data);
        // });
    }

    notifyEvent(message: string) {
        console.log('notify', message);
        Object.keys(this.sockets).map((key: any, index: any) => {
            console.log('here');
            this.sockets[key].socket.emit(EventTypes.NOTIFY_GIC, message);
        });
    }

    async startSession(socketId: any) {
        try {
            console.log('Start Maze Session');
            const userIdCast = new mongoose.Types.ObjectId(this.userId);

            const session = await this.mazeService.createSession(userIdCast, 1);

            Object.keys(this.sockets).map((key: any, index: any) => {
                this.sockets[key].socket.emit(
                    EventTypes.START_MAZE_SESSION_SUCCESS,
                    session,
                );
            });
        } catch (err) {
            console.log('ERRRR', err);
            this.sockets[socketId].socket.emit(
                EventTypes.START_MAZE_SESSION_FAIL,
            );
        }
    }

    async submitSingleMove(sessionId: string, move: string, socketId: any) {
        try {
            const userIdCast = new mongoose.Types.ObjectId(this.userId);
            const sessionIdCast = new mongoose.Types.ObjectId(sessionId);

            const result = await this.mazeService.submitSingleMove(
                sessionIdCast,
                userIdCast,
                move,
            );

            Object.keys(this.sockets).map((key: any, index: any) => {
                this.sockets[key].socket.emit(EventTypes.MOVE_SUCCESS, result);
            });
        } catch (error) {
            console.log(error.message);
            this.sockets[socketId].socket.emit(EventTypes.MOVE_FAIL);
        }
    }

    async onDisconnect(socket: any, reason: any) {
        console.log('Disconnect from: ', socket.id);
        console.log('reason: ', reason);
        console.log('User data: ', this.userData.username);
        if (this.sockets[socket.id].sessionId)
            await this.gameService.endSessionGame(
                this.sockets[socket.id].sessionId,
            );
        delete this.sockets[socket.id];
    }
}

export default ClientUser;
