import { Request as ERequest, Response as EResponse } from 'express';
import { HttpResponseComposer } from './lib/response-composer';
import { Token, TokenDocument } from './models/token.model';
import { UserAuth } from './typings/express';

export interface Request extends ERequest {
    tokenMeta: UserAuth;
}

export interface Response extends EResponse {
    composer?: HttpResponseComposer;
}

export const ServiceType = {
    Auth: Symbol.for('AuthService'),
    Database: Symbol.for('DatabaseService'),
    User: Symbol.for('UserService'),
    Game: Symbol.for('GameService'),
    Socket: Symbol.for('Socket'),
    Item: Symbol.for('ItemService'),
    MarketplaceItem: Symbol.for('MarketplaceItemService'),
    Transaction: Symbol.for('TransactionService'),
    Order: Symbol.for('OrderService'),
    ClubDay: Symbol.for('ClubDayService'),
    Discord: Symbol.for('DiscordService'),
    FileUpload: Symbol.for('FileUploadService'),
    // Cache: Symbol.for("CacheService"),
    GIC: Symbol.for('GICService'),
    GICAchievement: Symbol.for('GICAchievement'),
    Mail: Symbol.for('Mail'),
    Maze: Symbol.for('MazeService'),
    MazeChapter: Symbol.for('MazeChapterService'),
    MazeChapterSession: Symbol.for('MazeChaperSessionService'),
};

export enum PrivacyType {
    PUBLIC = 'public',
    PROTECTED = 'protected',
    PRIVATE = 'private',
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export type DownloadFileInfo = {
    originalName: string;
    refName: string;
    mimetype: string;
    buffer: Buffer;
};
