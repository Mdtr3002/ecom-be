import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

export interface LevelInfo {
    cellCount: number;
    memoryCount: number;
    fieldSize: number;
    space: number;
    score: number;
    time?: number;
    field?: number[];
    hiddenCells?: number[];
}

export type GameSessionDocument = Document & {
    levelInfo: LevelInfo;
    level: number;
    userId?: string;
    createdAt: number;
    finishAt: number;
    chooseFields: number[];
};

const gameSessionSchema = new Schema<GameSessionDocument>({
    level: Number,
    userId: String,
    createdAt: Number,
    finishAt: Number,
    levelInfo: Schema.Types.Mixed,
    chooseFields: Array<Number>,
});

const GameSession = mongoose.model<GameSessionDocument>(
    'GameSession',
    gameSessionSchema,
);

export default GameSession;
