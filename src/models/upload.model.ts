import { ObjectId } from 'mongoose';

export interface Upload {
    _id?: ObjectId;
    userId: ObjectId;
    createdAt: number;
    type: string;
    path: string;
}
