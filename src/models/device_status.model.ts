import { ObjectId } from 'mongoose';
import _ from 'lodash';

export class DeviceStatus {
    readonly _id?: ObjectId;
    deviceId: ObjectId;
    data: string;
    message: string;
    createdAt: number;
}

export function fillDefaultDeviceStatusValue(
    deviceStatus: DeviceStatus,
): DeviceStatus {
    return _.merge(
        {
            data: '',
            createdAt: Math.floor(Date.now() / 1000),
        },
        deviceStatus,
    );
}
