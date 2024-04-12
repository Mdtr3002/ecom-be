import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

export type BookFairDocument = Document & {
    userId: string;
    level: number;
    claimAt: number;
};

const bookFairSchema = new Schema<BookFairDocument>({
    userId: String,
    level: Number,
    claimAt: Number,
});

const BookFair = mongoose.model<BookFairDocument>('BookFair', bookFairSchema);

export default BookFair;
