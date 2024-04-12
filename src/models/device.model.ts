import { ObjectId } from 'mongoose';
import _ from 'lodash';

export class Device {
    readonly _id?: ObjectId;
    id: number;
    name: string;
    unit: string;
    createdAt: number;
    createdBy: ObjectId;
    isDeleted: boolean;
    isWorking: boolean;
    isLocked: boolean; // Lock from changing
    dienNang: number;
    room?: ObjectId;
    isLoopEvent: boolean;
    data: string;
}

export function fillDefaultDeviceValue(device: Device): Device {
    return _.merge(
        {
            unit: '',
            createdAt: Math.floor(Date.now() / 1000),
            isLocked: false,
            isDeleted: false,
            isWorking: true,
            isLoopEvent: false,
            dienNang: 100,
        },
        device,
    );
}
