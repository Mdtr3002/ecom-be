import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import useragent from 'express-useragent';
import http from 'http';
import { Controller } from './controllers';

import { SERVICE_NAME, STATIC_DIR } from './config';
import { COOKIE_KEY } from './config';
import cookieSession from 'cookie-session';
import passport from 'passport';
import { Socket } from 'socket.io';
class App {
    public app: any;
    public server: any;
    public port: number;
    public io: Socket;

    constructor(controllers: Controller[], port: number, middlewares: any[]) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares(middlewares);
        this.initializeControllers(controllers);

        this.server = http.createServer(this.app);
        this.io = require('socket.io')(this.server, {
            cors: {
                origin: '*',
                methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
                preflightContinue: false,
                optionsSuccessStatus: 204,
            },
        });
    }

    private initializeMiddlewares(middlewares: any[]) {
        this.app.disable('x-powered-by');
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(cors());
        this.app.use(useragent.express());

        this.app.use('/static', express.static(STATIC_DIR));

        middlewares.forEach((m) => this.app.use(m));
        this.app.use(passport.session());
        this.app.use(
            cookieSession({
                maxAge: 24 * 60 * 60 * 1000,
                keys: [COOKIE_KEY],
            }),
        );
    }

    public applyExternalMiddleware(middleware: any) {
        this.app.use(middleware);
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use(controller.path, controller.router);
        });
    }

    public listen() {
        // this.server.listen(this.port);
        // this.server.on('error', () => {
        //     console.log('Err');
        // });
        // this.server.on('listening', () => {
        //     console.log(`[${SERVICE_NAME}] listening on the port ${this.port}`);
        // });

        this.server.listen(this.port, () => {
            console.log(`[${SERVICE_NAME}] listening on the port ${this.port}`);
        });
    }
}

export { App };
