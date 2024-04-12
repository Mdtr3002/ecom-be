import mongoose, { Document, Types } from 'mongoose';
import { MazeGameChapterDocument } from './maze_game_chapter.model';

export const USER_FORBIDDEN_FIELDS = [
    'password',
    'isArchived',
    'isActivated',
    'isVerified',
    'recoverPasswordCode',
    'recoverPasswordExpires',
    'verifyAccountCode',
];

export enum USER_ROLES {
    SYSTEM = 'SYSTEM',
    STAFF_CLUBDAY_VERIFY = 'STAFF_CLUBDAY_VERIFY',
    STAFF_CLUBDAY_GIFT = 'STAFF_CLUBDAY_GIFT',
    USER = 'USER',
    GAME_BOT = 'GAME_BOT',
    SUPER_ADMIN = 'SUPER_ADMIN',
    GIC_ADMIN = 'GIC_ADMIN',
}

const Schema = mongoose.Schema;

export type UserDocument = Document & {
    username: string;
    email: string;
    phone: string;
    university: string;
    studentId: string;
    dob: number;
    googleId: string;
    appleId?: string;
    balance: number;
    highestScoreMathQuiz: number;
    picture: string;
    name: string;
    discordId: string;
    verifyDiscordCode: number;
    verifyDiscordCodeAt: number;
    availableReceiving: number;
    roles: USER_ROLES[];
    currentMazeChapter: Types.ObjectId & MazeGameChapterDocument;
};

const userSchema = new Schema<UserDocument>({
    username: String,
    email: String,
    phone: String,
    studentId: String,
    university: String,
    dob: Number,
    googleId: String,
    appleId: String,
    balance: { type: Number, default: 0 },
    highestScoreMathQuiz: { type: Number, default: 0 },
    picture: String,
    name: String,
    discordId: String,
    verifyDiscordCode: Number,
    verifyDiscordCodeAt: Number,
    availableReceiving: { type: Number, default: 1000 },
    roles: Array<USER_ROLES>,
    currentMazeChapter: {
        type: Schema.Types.ObjectId,
        ref: 'maze_game_chapter',
        default: null,
    },
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
