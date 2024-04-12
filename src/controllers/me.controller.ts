// import { Router } from 'express';
// import { inject, injectable } from 'inversify';
// import {
//     Request,
//     Response,
//     ServiceType,
//     PrivacyType,
//     HttpMethod,
// } from '../types';
// import { Controller } from './controller';
// import {
//     UserService,
//     AuthService,
//     // UploadService,
//     // BundleService,
// } from '../services';
// import _ from 'lodash';

// @injectable()
// export class MeController extends Controller {
//     public readonly router = Router();
//     public readonly path = '/me';

//     constructor(
//         @inject(ServiceType.User) private userService: UserService,
//         @inject(ServiceType.Auth) private authService: AuthService,
//         // @inject(ServiceType.Upload) private uploadService: UploadService,
//     ) // @inject(ServiceType.Bundle) private bundleService: BundleService,
//     {
//         super();

//         this.router.all('*', this.authService.authenticate());

//         this.router.get('/', this.getUser.bind(this));
//         this.router.get('/bundles', this.getBundles.bind(this));
//         this.router.get('/bundles/discover', this.discoverBundles.bind(this));
//         this.router.get('/following', this.getFollowing.bind(this));
//         this.router.get('/followers', this.getFollower.bind(this));
//         this.router.get('/saved', this.getSavedBundles.bind(this));

//         this.router.patch('/profile', this.updateProfile.bind(this));

//         this.router.post('/change-password', this.changePassword.bind(this));
//         this.router.post('/follow/:followedid', this.follow.bind(this));
//         this.router.delete('/follow/:followedid', this.unfollow.bind(this));

//         this.router.post('/save/:bundleId', this.saveBundle.bind(this));
//         this.router.delete('/save/:bundleId', this.saveBundle.bind(this));

//         this.router.post(
//             '/profile/picture',
//             this.updateProfilePicture.bind(this),
//         );
//     }

//     async getUser(req: Request, res: Response) {
//         const { userId } = req.tokenMeta;
//         try {
//             const user = await this.userService.findOne({ _id: userId });
//             res.composer.success(user);
//         } catch (error) {
//             res.composer.badRequest(error.message);
//         }
//     }

//     async getBundles(req: Request, res: Response) {
//         // const { startAfter } = req.query;
//         // let { limit = LIMIT_PAGING } = req.query;
//         // limit = Math.min(limit, LIMIT_PAGING);
//         // const { userId } = req.tokenMeta;
//         // const queryCommand = {
//         //     isDeleted: false,
//         //     files: { $exists: true, $ne: <any>[] },
//         //     user: userId,
//         //     ...(startAfter && { _id: { $lt: ObjectID.createFromHexString(startAfter) } }),
//         // };
//         // try {
//         //     const bundles = await this.bundleService.find(queryCommand, true, +limit);
//         //     res.composer.success(bundles);
//         // } catch (error) {
//         //     res.composer.badRequest(error.message);
//         // }
//     }

//     async discoverBundles(req: Request, res: Response) {
//         // const { limit = 10, startAfter } = req.query;
//         // const { userId } = req.tokenMeta;
//         // const user = await this.userService.findOne({ _id: userId });
//         // const queryCommand = {
//         //     isDeleted: false,
//         //     privacy: PrivacyType.PUBLIC,
//         //     files: { $exists: true, $ne: <any>[] },
//         //     user: { $in: user.following },
//         //     ...(startAfter && { _id: { $lt: ObjectID.createFromHexString(startAfter) } }),
//         // };
//         // try {
//         //     const bundles = await this.bundleService.find(queryCommand, true, +limit);
//         //     res.composer.success(bundles);
//         // } catch (error) {
//         //     res.composer.badRequest(error.message);
//         // }
//     }

//     async getFollowing(req: Request, res: Response) {
//         // const { userId } = req.tokenMeta;
//         // const user = await this.userService.findOne({ _id: userId });
//         // try {
//         //     const followingUsers = await this.userService.find({
//         //         _id: { $in: user.following },
//         //     });
//         //     res.composer.success(followingUsers);
//         // } catch (error) {
//         //     res.composer.badRequest(error.message);
//         // }
//     }

//     async getFollower(req: Request, res: Response) {
//         // const { userId } = req.tokenMeta;
//         // const user = await this.userService.findOne({ _id: userId });
//         // try {
//         //     const followingUsers = await this.userService.find({
//         //         _id: { $in: user.followers },
//         //     });
//         //     res.composer.success(followingUsers);
//         // } catch (error) {
//         //     res.composer.badRequest(error.message);
//         // }
//     }

//     async updateProfile(req: Request, res: Response) {
//         const { userId } = req.tokenMeta;
//         const PROFILE_KEYS = [
//             'email',
//             'phone',
//             'name',
//             'address',
//             'description',
//             'firstName',
//             'lastName',
//             'dob',
//             'gender',
//             'classId',
//             'mature',
//             'studentId',
//         ];
//         const userData = _.pick(req.body, PROFILE_KEYS);
//         try {
//             if (_.isEmpty(userData))
//                 throw new Error(`Field name must be ${PROFILE_KEYS}`);
//             const updateCommand = _.mapKeys(
//                 userData,
//                 (v: any, k: any) => `${k}`,
//             );

//             const affectedCount = await this.userService.updateOne(
//                 userId,
//                 updateCommand,
//             );
//             res.composer.success(affectedCount);
//         } catch (error) {
//             res.composer.badRequest(error.message);
//         }
//     }

//     async changePassword(req: Request, res: Response) {
//         const { userId } = req.tokenMeta;
//         const { currentPassword, newPassword } = req.body;
//         try {
//             const affectedCount = await this.userService.changePassword(
//                 userId,
//                 currentPassword,
//                 newPassword,
//             );
//             res.composer.success(affectedCount);
//         } catch (error) {
//             res.composer.badRequest(error.message);
//         }
//     }

//     async follow(req: Request, res: Response) {
//         const { userId } = req.tokenMeta;
//         const followedID = ObjectID.createFromHexString(req.params.followedid);
//         try {
//             const affectedCount = await this.userService.follow(
//                 userId,
//                 followedID,
//             );
//             res.composer.success(affectedCount);
//         } catch (error) {
//             res.composer.badRequest(error.message);
//         }
//     }

//     async unfollow(req: Request, res: Response) {
//         const { userId } = req.tokenMeta;
//         const followedID = ObjectID.createFromHexString(req.params.followedid);
//         try {
//             const affectedCount = await this.userService.unfollow(
//                 userId,
//                 followedID,
//             );
//             res.composer.success(affectedCount);
//         } catch (error) {
//             res.composer.badRequest(error.message);
//         }
//     }

//     async updateProfilePicture(req: Request, res: Response) {
//         try {
//             const { userId } = req.tokenMeta;

//             const uploadedPath = await this.uploadService.handleImageUpload(
//                 req,
//             );
//             const affectedCount = await this.userService.updateOne(userId, {
//                 profilePicture: uploadedPath,
//             });

//             res.composer.success(affectedCount);
//         } catch (error) {
//             res.composer.badRequest(error.message);
//         }
//     }

//     async saveBundle(req: Request, res: Response) {
//         const { userId } = req.tokenMeta;
//         const bundleId = ObjectID.createFromHexString(req.params.bundleId);

//         try {
//             let isSuccess = false;

//             switch (req.method) {
//                 case HttpMethod.POST:
//                     isSuccess = await this.userService.saveBundle(
//                         userId,
//                         bundleId,
//                     );
//                     break;
//                 case HttpMethod.DELETE:
//                     isSuccess = await this.userService.unsaveBundle(
//                         userId,
//                         bundleId,
//                     );
//                     break;
//                 default:
//                     throw new Error('Invalid HTTP method');
//             }

//             res.composer.success(isSuccess);
//         } catch (error) {
//             res.composer.badRequest(error.message);
//         }
//     }

//     async getSavedBundles(req: Request, res: Response) {
//         // const { userId } = req.tokenMeta;
//         // try {
//         //     const user = await this.userService.findOne({ _id: userId }, true);
//         //     const bundles = await this.bundleService.find(
//         //         { _id: { $in: user.savedBundles } },
//         //         true,
//         //     );
//         //     res.composer.success(bundles);
//         // } catch (error) {
//         //     res.composer.badRequest(error.message);
//         // }
//     }
// }
