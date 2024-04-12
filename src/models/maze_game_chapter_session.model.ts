import mongoose, { Schema, Types } from 'mongoose';
import { MazeGameChapterDocument } from './maze_game_chapter.model';

export enum ChapterStatus {
    InProgress = 'in_progress',
    Done = 'done',
}

export type MazeGameChapterSessionDocument = Document & {
    chapterId: Types.ObjectId & MazeGameChapterDocument;
    helpCount: number;
    currentRound: number;
    userId: Types.ObjectId;
    rounds: [Types.ObjectId];
    status: ChapterStatus;
};

const mazeGameChapterSessionSchema = new Schema<MazeGameChapterSessionDocument>(
    {
        chapterId: { type: Schema.Types.ObjectId, ref: 'maze_game_chapter' },
        helpCount: Number,
        currentRound: Number,
        userId: { type: Schema.Types.ObjectId, ref: 'Users' },
        rounds: [{ type: Schema.Types.ObjectId, ref: 'maze_game_session' }],
        status: String,
    },
);

const mazeGameChapterSessionModel =
    mongoose.model<MazeGameChapterSessionDocument>(
        'maze_game_chapter_session',
        mazeGameChapterSessionSchema,
    );

export default mazeGameChapterSessionModel;
