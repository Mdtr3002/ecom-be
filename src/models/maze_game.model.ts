import mongoose, { Document, Schema, Types } from 'mongoose';

export type Character = {
    hp: number;
    armor: number;
    stamina: number;
    position: number;
    key: number;
};

export enum CellType {
    Path = 'path',
    Wall = 'wall',
    Lava = 'lava',
    End = 'end',
    HpPortion = 'hp_portion',
    StaminaPortion = 'stamina_portion',
    Armor = 'armor',
    Baron = 'baron',
    Dragon = 'dragon',
    Trap = 'trap',
    Key = 'key',
    LockGate = 'lock_gate',
    Portal = 'portal',
}

export interface Cell {
    property: CellType;
    isHidden: boolean;
    hp?: number;
    armor?: number;
    attack?: number;
    stamina?: number;
    to?: number;
}

export type MazeGameDocument = Document & {
    map: Cell[];
    character: Character;
    size: {
        width: number;
        height: number;
    };
    level: number;
};

const mazeGameSchema = new Schema<MazeGameDocument>({
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
});

const mazeGameModel = mongoose.model<MazeGameDocument>(
    'maze_game',
    mazeGameSchema,
);
export default mazeGameModel;
