import mongoose, { Document, Schema, Types } from 'mongoose';
import { WhitelistDomain } from '../config';

export type PingHistoryDocument = Document & {
    userId?: Types.ObjectId;
    pingAt?: number;
    domain?: WhitelistDomain;
};

const pingHistorySchema = new Schema<PingHistoryDocument>({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    pingAt: Number,
    domain: { type: String, enum: WhitelistDomain },
});

const PingHistoryModel = mongoose.model<PingHistoryDocument>(
    'pings',
    pingHistorySchema,
);
export default PingHistoryModel;
