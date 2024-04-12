import mongoose, { Document, Schema } from 'mongoose';

export type MazeGameChapterDocument = Document & {
    chapterLevel: number;
    helpCount: number;
    roundLevels: number[];
};

const mazeGameChapterSchema = new Schema<MazeGameChapterDocument>({
    chapterLevel: Number,
    helpCount: Number,
    roundLevels: [{ type: Number, default: [1] }],
});

const mazeGamechapterModel = mongoose.model<MazeGameChapterDocument>(
    'maze_game_chapter',
    mazeGameChapterSchema,
);

export default mazeGamechapterModel;
