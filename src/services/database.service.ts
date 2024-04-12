import { injectable } from 'inversify';
import { DB_CONN_STRING, DB_NAME } from '../config';
import mongoose, { Mongoose } from 'mongoose';

@injectable()
export class DatabaseService {
    constructor() {
        console.log('[Database service] Construct');
    }

    async initialize() {
        console.log(
            '[DB] Prepare to connect db with connection string:',
            DB_CONN_STRING,
        );

        try {
            mongoose.connect(DB_CONN_STRING, () => {
                console.log('connected to mongodb');
            });
        } catch (error) {
            console.log(error);
        }
    }
}
