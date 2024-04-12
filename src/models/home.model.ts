// import _ from 'lodash';
// import { User } from './user.model';

// export enum Service {
//     IllegalDetection = 'IllegalDetection',
//     PlantWatering = 'PlantWatering',
//     FireAlarm = 'FireAlarm',
//     EntranceManagement = 'EntranceManagement',
//     AutoLighting = 'AutoLighting',
// }

// export interface Routine {
//     readonly _id?: ObjectID;
//     config: {
//         deviceId: ObjectID;
//         value: number;
//     };
//     createdAt: number;
//     createdBy: string;
//     home?: ObjectID;
// }

// export interface Home {
//     readonly _id?: ObjectID;
//     name: string;
//     address: string;
//     password: string;
//     createdAt: number;
//     createdBy: ObjectID;
//     isDeleted: boolean;
//     routines: Routine[];
//     user: User[];
//     services: Service[];
// }

// export function fillDefaultHomeValue(home: Home): Home {
//     return _.merge(
//         {
//             name: '',
//             password: '',
//             address: '',
//             routines: [],
//             isDeleted: false,
//             createdAt: Math.floor(Date.now() / 1000),
//         },
//         home,
//     );
// }

// export function fillDefaultRoutineValue(routine: Routine): Routine {
//     return _.merge(
//         {
//             config: {
//                 deviceId: '',
//                 value: '',
//             },
//             isDeleted: false,
//             createdAt: Math.floor(Date.now() / 1000),
//         },
//         routine,
//     );
// }
