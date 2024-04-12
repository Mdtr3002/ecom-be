import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

export type ClubDayDocument = Document & {
    userId: string;
    name: string;
    studentId: string;
    isFinishGame: boolean;
    isFinishMathQuiz: boolean;
    isFinishMaze: boolean;
    isFinishCheckIn: boolean;
    isFinishKeyMatching: boolean;
    claimAt: number;
    gifts: Reward[];
};

export type Reward = {
    type: string;
    quantity: number;
};

const clubDaySchema = new Schema<ClubDayDocument>({
    userId: String,
    name: String,
    studentId: String,
    isFinishGame: {
        type: Boolean,
        default: false,
    },
    isFinishMathQuiz: {
        type: Boolean,
        default: false,
    },
    isFinishMaze: {
        type: Boolean,
        default: false,
    },
    isFinishCheckIn: {
        type: Boolean,
        default: false,
    },
    isFinishKeyMatching: {
        type: Boolean,
        default: false,
    },
    claimAt: Number,
    gifts: Array<Reward>,
});

const ClubDay = mongoose.model<ClubDayDocument>('ClubDay', clubDaySchema);

export default ClubDay;
