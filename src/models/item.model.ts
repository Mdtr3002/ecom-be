import mongoose, { Document, Types } from 'mongoose';

const Schema = mongoose.Schema;

export type Collection =
    | 'Sticker'
    | 'Keychain'
    | 'Bracelet'
    | 'Tote'
    | 'GicReward'

export type PriceHistory = {
    email: string;
    name: string;
    createdAt: number;
    price: number;
};

export type ItemDocument = Document & {
    ownerId: Types.ObjectId;
    name: string;
    imgUrl: string;
    description: string;
    currentPrice: number;
    isReceived: boolean;
    receivedAt: boolean;
    receivedNote: string;
    isRequestToReceiveItem: boolean;
    requestToReceiveItemAt: number;
    collectionName: Collection;
    priceHistory?: PriceHistory[];
};

const itemSchema = new Schema<ItemDocument>({
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    name: String,
    imgUrl: String,
    description: String,
    currentPrice: Number,
    collectionName: String,
    isReceived: { type: Boolean, default: false },
    receivedAt: Boolean,
    receivedNote: String,
    isRequestToReceiveItem: { type: Boolean, default: false },
    requestToReceiveItemAt: Number,
    priceHistory: [
        { email: String, name: String, createdAt: Number, price: Number },
    ],
});

const Item = mongoose.model<ItemDocument>('Item', itemSchema);

export default Item;
