import mongoose, { Document, Schema, Types } from 'mongoose';
import { Cell, Character } from './maze_game.model';

export enum Status {
    InProgress = 'in_progress',
    Win = 'win',
    Lose = 'lose',
}

export enum Direction {
    Up = 'up',
    Down = 'down',
    Right = 'right',
    Left = 'left',
}

export type MazeGameSessionDocument = Document & {
    map: Cell[];
    character: Character;
    size: {
        width: number;
        height: number;
    };
    level: number;
    userId: Types.ObjectId;
    chapterSessionId: Types.ObjectId;
    status: Status;
    mapId: Types.ObjectId;
    moves: Direction[];
};

const mazeGameSessionSchema = new Schema<MazeGameSessionDocument>({
    map: [
        {
            property: String,
            isHidden: Boolean,
            hp: {
                type: Number,
                required: false,
            },
            armor: {
                type: Number,
                required: false,
            },
            stamina: {
                type: Number,
                required: false,
            },
            attack: {
                type: Number,
                required: false,
            },
            to: {
                type: Number,
                required: false,
            },
        },
    ],
    character: {
        hp: Number,
        armor: Number,
        stamina: Number,
        position: Number,
        key: Number,
    },
    size: {
        width: { type: Number },
        height: { type: Number },
    },
    level: { type: Number, default: 1 },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    chapterSessionId: {
        type: Schema.Types.ObjectId,
        ref: 'maze_game_chapter_session',
    },
    status: String,
    mapId: { type: Schema.Types.ObjectId, ref: 'maze_game' },
    moves: [{ type: String, default: [] }],
});

const mazeGameSchemaModel = mongoose.model<MazeGameSessionDocument>(
    'maze_game_session',
    mazeGameSessionSchema,
);

export default mazeGameSchemaModel;
