import mongoose, { Document, Schema, Types } from 'mongoose';

export enum DayRegStatus {
    REGISTERED = 'REGISTERED',
    CANCELLED = 'CANCELLED',
    CHECKIN = 'CHECKIN',
}

export type DayRegDocument = Document & {
    registeredBy: Types.ObjectId;
    registeredAt: number;
    day: number;
    status: DayRegStatus;
    checkinAt: number;
    invitedBy: Types.ObjectId;
    ideaBoardId: number
};

const dayRegSchema = new Schema<DayRegDocument>({
    registeredBy: { type: Schema.Types.ObjectId, ref: 'User' },
    registeredAt: Number,
    day: Number,
    status: { type: String, enum: DayRegStatus },
    checkinAt: Number,
    invitedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    ideaBoardId: { type: Number, unique: true, required: false }
});

const DayRegModel = mongoose.model<DayRegDocument>(
    'day_registrations',
    dayRegSchema,
);
export default DayRegModel;
