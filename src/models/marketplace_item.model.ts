import mongoose, { Document, Types } from 'mongoose';
import { Collection } from './item.model';

const Schema = mongoose.Schema;

export type PriceHistory = {
    email: string;
    name: string;
    createdAt: number;
    price: number;
};

export type MarketplaceItemDocument = Document & {
    itemId: Types.ObjectId;
    collectionName: Collection;
    currentPrice: number;
    currentBidUserId?: Types.ObjectId;
    followedUsers?: Types.ObjectId[];
    minPrice: number;
    maxPrice: number;
    title: string;
    note: string;
    priceHistory?: PriceHistory[];
    createdAt: number;
    expiredAt: number;
    ownerName: string;
    claimed: boolean;
};

const marketplaceItemSchema = new Schema<MarketplaceItemDocument>({
    itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
    currentPrice: Number,
    collectionName: String,
    currentBidUserId: { type: Schema.Types.ObjectId, ref: 'User' },
    followedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    minPrice: Number,
    maxPrice: Number,
    title: String,
    note: String,
    priceHistory: [
        { email: String, name: String, createdAt: Number, price: Number },
    ],
    createdAt: Number,
    expiredAt: Number,
    ownerName: String,
    claimed: { type: Boolean, default: false },
});

const MarketplaceItem = mongoose.model<MarketplaceItemDocument>(
    'MarketplaceItem',
    marketplaceItemSchema,
);

export default MarketplaceItem;
