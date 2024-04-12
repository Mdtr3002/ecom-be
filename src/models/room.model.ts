// import _ from 'lodash';

// export class Room{
//     readonly _id?: ObjectID;
//     name: string;
//     createdAt: number;
//     createdBy: ObjectID;
//     devices: ObjectID[];
//     isDeleted: boolean;
//     homeId: ObjectID;
// }

// export function fillDefaultRoomValue(room: Room): Room {
//     return _.merge(
//         {
//             name: '',
//             createdAt: Math.floor(Date.now() / 1000),
//             devices: [],
//             isDeleted: false,
//         },
//         room,
//     );
// }
