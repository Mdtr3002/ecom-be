import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

export type RandomPoolDocument = Document & {
    itemIds: string[];
};

const randomPoolSchema = new Schema<RandomPoolDocument>({
    itemIds: [String],
});

const RandomPool = mongoose.model('RandomPool', randomPoolSchema);

export default RandomPool;
