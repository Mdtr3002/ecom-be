import _ from 'lodash';
import { injectable, inject } from 'inversify';

import { EventTypes } from './event-types';
// import { verifyJWTToken } from "../services/auth.service";
import ClientUser from './client-user';
import TrackingUser from './tracking-user';
import { Request, Response, ServiceType } from '../types';
import TrackingDevice from './tracking-device';
import passport from 'passport';
// import IllegalDetection from './illegal-detection';
// import PlantWatering from './plant-watering';
// import FireAlarm from './fire-alarm';
// import EntranceManagement from './entrance-management';
// import AutoLighting from './auto-lighting';
import {
    // DeviceService,
    // DeviceStatusService,
    AuthService,
    ClubDayService,
    GameService,
    TransactionService,
    UserService,
    ItemService,
    MazeService,
    // MQTTService,
} from '../services';
import { JWT_SECRET } from '../config';
import { nextTick } from 'process';
import { Socket } from 'socket.io';
import { TokenDocument } from '../models/token.model';
import { GICAchievementService } from '../services/gic/gic_achievement.service';
import { lazyInject } from '../container';
import { GICService } from '../services/gic/gic.service';
import mongoose from 'mongoose';

// let socketIOServer = null;
// let connectedUser = [] as any;
// let tracking = new TrackingUser();

// let clientSockets: any = [];

export interface CustomSocket extends Socket {
    userId: string;
}

export type ConnectedUser = {
    [userId: string]: ClientUser;
};

@injectable()
export class SocketService {
    private socketIOServer: any;
    private connectedUser: ConnectedUser;
    private tracking: TrackingUser;
    private clientSockets: any;
    private trackingDevice: TrackingDevice;
    @lazyInject(ServiceType.GICAchievement)
    private gicAchievementService: GICAchievementService;
    @lazyInject(ServiceType.GIC) private gicService: GICService;
    constructor(
        // @inject(ServiceType.MQTT) private mqttService: MQTTService,
        // @inject(ServiceType.Device) private deviceService: DeviceService,
        // @inject(ServiceType.DeviceStatus)
        // private deviceStatusService: DeviceStatusService,
        @inject(ServiceType.Auth) private authService: AuthService,
        @inject(ServiceType.Game) private gameService: GameService,
        @inject(ServiceType.ClubDay) private clubDayService: ClubDayService,
        @inject(ServiceType.User) private userService: UserService,
        @inject(ServiceType.Transaction)
        private transactionService: TransactionService,
        @inject(ServiceType.Item)
        private itemService: ItemService,
        @inject(ServiceType.Maze) private mazeService: MazeService,
    ) {
        console.log('[SOCKET IO Service] Construct');

        this.socketIOServer = null;
        this.tracking = new TrackingUser();
        this.trackingDevice = new TrackingDevice();
        this.clientSockets = [];
        this.connectedUser = [] as any;
    }

    // notifyUser = (receiveUserId: any, data: any) => {
    //     console.log('Noti');
    //     this.connectedUser.map((e: any) => {
    //         e.notifyClient('Hello World');
    //     });

    //     // if (_.has(connectedUser, receiveUserId)) {
    //     //     console.log('User receive nofti: ', receiveUserId);
    //     //     connectedUser[receiveUserId].notifyClient(data);
    //     // }
    // };

    onConnection = (socket: CustomSocket) => {
        console.log('New user connected');
        console.log('Has a new connection', socket.id);
        console.log('Connected User', socket.userId);
        if (!_.has(this.connectedUser, socket.userId)) {
            this.connectedUser[socket.userId] = new ClientUser(
                socket.userId,
                this.gameService,
                this.clubDayService,
                this.userService,
                this.transactionService,
                this.itemService,
                this.gicAchievementService,
                this.gicService,
                this.mazeService,
            );
        }
        this.connectedUser[socket.userId].registerSocket(socket);

        this.tracking.addUserConnecting(socket.id, socket.userId);

        this.connectedUser[socket.userId].SyncMathQuizRanking(socket, []);

        socket.emit(EventTypes.AUTHENTICATE, { success: true });

        socket.on(EventTypes.CREATE_NEW_GAME, () =>
            this.connectedUser[socket.userId].createNewSessionGame(socket.id),
        );

        socket.on(EventTypes.ON_CHOOSE_CELL, (cellId: number) =>
            this.connectedUser[socket.userId].onClickCell(socket.id, cellId),
        );

        socket.on(EventTypes.START_QUIZ, () =>
            this.connectedUser[socket.userId].startQuiz(
                socket.id,
                this.connectedUser,
            ),
        );

        socket.on(EventTypes.ANSWER_QUIZ, (answer: any) =>
            this.connectedUser[socket.userId].answerQuiz(
                socket.id,
                answer,
                this.connectedUser,
            ),
        );

        socket.on(EventTypes.QUIZ_TIMEOUT, () =>
            this.connectedUser[socket.userId].endQuizTimeout(
                socket.id,
                this.connectedUser,
            ),
        );

        socket.on(EventTypes.START_MAZE_SESSION, () =>
            this.connectedUser[socket.userId].startSession(socket.id),
        );

        socket.on(
            EventTypes.MOVE,
            ({ sessionId, move }: { sessionId: string; move: string }) =>
                this.connectedUser[socket.userId].submitSingleMove(
                    sessionId,
                    move,
                    socket.id,
                ),
        );

        socket.on(EventTypes.DISCONNECT, () => {
            this.tracking.removeUserConnecting(socket.id);
        });
    };

    // Emit 'notify' event to all clients
    notifyUpdate = (data: any) => {
        this.trackingDevice.update(data.name, data);

        Object.keys(this.connectedUser).map((key: any, index: any) => {
            this.connectedUser[key].notifyClient(data);
        });
    };

    notifyEvent = (userId: string, message: string) => {
        Object.keys(this.connectedUser).map((key: any, index: any) => {
            console.log(userId, key, 'keyy');
            if (userId == key) this.connectedUser[key].notifyEvent(message);
        });
    };

    notifyVoted(userId: string) {
        Object.keys(this.connectedUser).map((key: any, index: any) => {
            console.log(userId, key, 'keyy');
            if (userId == key) {
                this.connectedUser[key].notifyVoted(this.connectedUser);
            }
        });
    }

    initialize = (socketServer: Socket) => {
        this.socketIOServer = socketServer;
        const wrapMiddlewareForSocketIo =
            (middleware: any) => (socket: any, next: any) =>
                middleware(socket.request, {}, next);
        this.socketIOServer.use(
            wrapMiddlewareForSocketIo(passport.initialize()),
        );
        this.socketIOServer.use((socket: any, next: any) => {
            passport.authenticate(
                'jwt',
                (err, tokenMeta: TokenDocument, info, x, y) => {
                    if (err || !tokenMeta)
                        return next(new Error('Authentication error'));
                    socket.userId = tokenMeta.userId;
                    next();
                },
            )(socket.request, {}, next);
        });
        this.socketIOServer.on('connection', this.onConnection);
    };
}

// export const ServerEventSystem = {
//     initialize,
//     notifyUser,
//     notifyUpdate,
//     tracking,
// };
