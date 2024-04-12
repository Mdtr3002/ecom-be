import mongoose, { Document, Schema, Types } from 'mongoose';

export type GicGiftDocument = Document & {
    userId: Types.ObjectId;
    name: string;
    description: string;
    isReceived: boolean;
    reveicedAt: number;
};

const gicGiftSchema = new Schema<GicGiftDocument>({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    description: String,
    isReceived: Boolean,
    reveicedAt: Number,
});

const GicGiftModel = mongoose.model<GicGiftDocument>(
    'gic_gifts',
    gicGiftSchema,
);
export default GicGiftModel;
