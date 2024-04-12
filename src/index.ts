import 'reflect-metadata';

import { App } from './app';
import container from './container';
import { SERVICE_PORT } from './config';
import { applyHttpResponseComposer } from './lib/response-composer';

import {
    AuthService,
    DatabaseService,
    UserService,
    GameService,
    ItemService,
    MarketplaceItemService,
    TransactionService,
    ClubDayService,
    DiscordService,
    MazeService,
    MazeChapterService,
    MazeChapterSessionService,
} from './services';
import {
    AuthController,
    UserController,
    GameController,
    ItemController,
    MarketplaceController,
    ClubDayController,
    DiscordController,
    GICController,
    MazeController,
    MazeSessionController,
    MazeChapterController,
    MazeChapterSessionController,
} from './controllers';
import { ServiceType } from './types';

import { SocketService } from './server-events';
import { FileUploadService } from './services/file-upload.service';
// import { CacheService } from './services/cache.service';
import { GICService } from './services/gic/gic.service';
import { MailService } from './services/mail.service';
import { GICAchievementService } from './services/gic/gic_achievement.service';

// Binding service
container
    .bind<AuthService>(ServiceType.Auth)
    .to(AuthService)
    .inSingletonScope();
container
    .bind<DatabaseService>(ServiceType.Database)
    .to(DatabaseService)
    .inSingletonScope();
container
    .bind<UserService>(ServiceType.User)
    .to(UserService)
    .inSingletonScope();
container
    .bind<GameService>(ServiceType.Game)
    .to(GameService)
    .inSingletonScope();
container
    .bind<ItemService>(ServiceType.Item)
    .to(ItemService)
    .inSingletonScope();
container
    .bind<MarketplaceItemService>(ServiceType.MarketplaceItem)
    .to(MarketplaceItemService)
    .inSingletonScope();
container
    .bind<TransactionService>(ServiceType.Transaction)
    .to(TransactionService)
    .inSingletonScope();
container
    .bind<SocketService>(ServiceType.Socket)
    .to(SocketService)
    .inSingletonScope();
container
    .bind<ClubDayService>(ServiceType.ClubDay)
    .to(ClubDayService)
    .inSingletonScope();
container
    .bind<DiscordService>(ServiceType.Discord)
    .to(DiscordService)
    .inSingletonScope();
container
    .bind<FileUploadService>(ServiceType.FileUpload)
    .to(FileUploadService)
    .inSingletonScope();
// container
//     .bind<CacheService>(ServiceType.Cache)
//     .to(CacheService)
//     .inSingletonScope();
container.bind<GICService>(ServiceType.GIC).to(GICService).inSingletonScope();
container
    .bind<MailService>(ServiceType.Mail)
    .to(MailService)
    .inSingletonScope();
container
    .bind<GICAchievementService>(ServiceType.GICAchievement)
    .to(GICAchievementService)
    .inSingletonScope();
container
    .bind<MazeService>(ServiceType.Maze)
    .to(MazeService)
    .inSingletonScope();
container
    .bind<MazeChapterService>(ServiceType.MazeChapter)
    .to(MazeChapterService)
    .inSingletonScope();
container
    .bind<MazeChapterSessionService>(ServiceType.MazeChapterSession)
    .to(MazeChapterSessionService)
    .inSingletonScope();

// Initialize service first
Promise.all([
    container.get<DatabaseService>(ServiceType.Database).initialize(),
]).then(() => {
    const app = new App(
        [
            container.resolve<AuthController>(AuthController),
            container.resolve<UserController>(UserController),
            container.resolve<GameController>(GameController),
            container.resolve<GICController>(GICController),
            container.resolve<ItemController>(ItemController),
            container.resolve<MarketplaceController>(MarketplaceController),
            container.resolve<ClubDayController>(ClubDayController),
            container.resolve<DiscordController>(DiscordController),
            container.resolve<MazeController>(MazeController),
            container.resolve<MazeSessionController>(MazeSessionController),
            container.resolve<MazeChapterController>(MazeChapterController),
            container.resolve<MazeChapterSessionController>(
                MazeChapterSessionController,
            ),
        ],
        SERVICE_PORT,
        [
            applyHttpResponseComposer,
            container.get<AuthService>(ServiceType.Auth).applyMiddleware(),
        ],
    );
    container.get<SocketService>(ServiceType.Socket).initialize(app.io);
    app.listen();
});
