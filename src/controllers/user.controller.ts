import { Router } from 'express';
import { inject, injectable } from 'inversify';
import _ from 'lodash';
import { Request, Response, ServiceType } from '../types';
import { Controller } from './controller';

// import { User } from '../models/user.model';
import {
    UserService,
    // BundleService,
    // MailService,
    AuthService,
    TransactionService,
    GameService,
} from '../services';
import {
    EMAIL_SENDER,
    IS_PRODUCTION,
    LIMIT_PAGING,
    SYSTEM_ACCOUNT_ID,
} from '../config';
import { Bundle } from '../models/bundle.model';
import { LeetCode } from 'leetcode-query';
import User, { UserDocument, USER_ROLES } from '../models/user.model';
import { ErrorNotFound, ErrorUserInvalid } from '../lib/errors';
import { Types } from 'mongoose';
import { scheduleJob } from 'node-schedule';
import Leaderboard from '../models/leaderboard.model';
import DiscordActivity from '../models/discord_activity';
import { randomIntFromInterval } from '../lib/helper';

@injectable()
export class UserController extends Controller {
    public readonly router = Router();
    public readonly path = '/users';

    constructor(
        @inject(ServiceType.Auth) private authService: AuthService,
        @inject(ServiceType.User) private userService: UserService,
        @inject(ServiceType.Game) private gameService: GameService,
        @inject(ServiceType.Transaction)
        private transactionService: TransactionService,
    ) {
        super();

        // Confing child routes
        this.router.post('/', this.createUser.bind(this));
        this.router.get(
            '/leetcode/:username',
            this.findLeetcodeUser.bind(this),
        );

        // this.router.post(
        //     '/verify-account-request',
        //     this.verifyAccountRequest.bind(this),
        // );
        // this.router.post('/verify-account', this.verifyAccount.bind(this));

        this.router.all('*', this.authService.authenticate(true));
        this.router.post('/resetAllScore', this.resetAllScore.bind(this));
        this.router.post('/triggerreset', this.triggerResetDaily.bind(this));
        this.router.post(
            '/triggerleaderboard',
            this.triggerLeaderboard.bind(this),
        );
        this.router.post('/create', this.createUser.bind(this));
        this.router.get('/transaction', this.getUserTransaction.bind(this));
        this.router.get('/', this.getUsers.bind(this));
        this.router.get('/me', this.getMe.bind(this));
        this.router.patch('/me', this.updatePrivate.bind(this));
        this.router.get('/balance', this.getUserBalance.bind(this));
        // this.router.patch('/balance', this.increaseBalance.bind(this)); // TODO: Test only
        this.router.get('/search', this.getByKeyword.bind(this));
        this.router.get('/:username', this.getByUsername.bind(this));
        this.router.get('/:userid/bundles', this.getBundles.bind(this));
        this.router.get('/:userid/following', this.getFollowing.bind(this));
        this.router.get('/:userid/followers', this.getFollower.bind(this));

        // START JOB
        scheduleJob('0 0 0 * * *', async () => {
            this.triggerResetDaily.bind(this)();
            this.triggerLeaderboard.bind(this)();
            const res = await this.gameService.findTopRankingDiscord();
            if (res) {
                this.resetAllScore.bind(this)();
            }
            const users = res.map((e) => {
                return {
                    name: e.name,
                    userId: e._id,
                    point: e.highestScoreMathQuiz,
                    discordId: e.discordId,
                };
            });
            users?.slice(0, 3).forEach((user) => {
                // TODO: add to GIC achievement
            });
            const leaderboard = new Leaderboard({
                createdAt: Date.now(),
                ranking: users,
            });
            leaderboard.save();
            await DiscordActivity.find().updateMany({ isDaily: false });
            console.log('The answer to life, the universe, and everything!');
        });

        const randomPoint = (time: string) =>
            scheduleJob(time, async () => {
                setTimeout(async () => {
                    try {
                        let usersList = IS_PRODUCTION
                            ? [
                                  '64759bb7a477b67094c3104d',
                                  '64759be8a477b67094c31093',
                                  '64759c2da477b67094c310a0',
                                  '64759c79a477b67094c310a3',
                                  '64759caca477b67094c310a8',
                                  '64759d2da477b67094c310b9',
                                  '64759d6aa477b67094c310fa',
                                  '64759dafa477b67094c31129',
                                  '64759dcba477b67094c3112c',
                                  '64759e09a477b67094c3112f',
                                  '64759e46a477b67094c31132',
                                  '64759e76a477b67094c31135',
                                  '64759e9fa477b67094c31138',
                                  '64759ecca477b67094c3113d',
                                  '64759ef2a477b67094c31140',
                                  '64759f28a477b67094c31145',
                                  '64759f5da477b67094c31148',
                                  '64759f89a477b67094c3114b',
                                  '64759fb7a477b67094c3114e',
                                  '64759fe4a477b67094c31151',
                                  '6475a011a477b67094c31154',
                                  '6475a039a477b67094c31157',
                                  '6475a062a477b67094c3115a',
                                  '6475a08aa477b67094c3115f',
                                  '6475a0bda477b67094c31162',
                              ]
                            : [
                                  '647590c4287db5254fabbc40',
                                  '647592a0287db5254fabbc43',
                                  '647594c2287db5254fabbc46',
                                  '647594cc287db5254fabbc49',
                                  '647594da287db5254fabbc4c',
                              ];
                        let userId =
                            usersList[
                                randomIntFromInterval(0, usersList.length)
                            ];
                        const user = await this.userService.findById(
                            new Types.ObjectId(userId),
                        );
                        if (user.highestScoreMathQuiz < 30) {
                            user.highestScoreMathQuiz = randomIntFromInterval(
                                user.highestScoreMathQuiz,
                                50,
                            );
                        } else if (user.highestScoreMathQuiz < 50) {
                            user.highestScoreMathQuiz = randomIntFromInterval(
                                user.highestScoreMathQuiz,
                                70,
                            );
                        } else if (user.highestScoreMathQuiz < 70) {
                            user.highestScoreMathQuiz = randomIntFromInterval(
                                user.highestScoreMathQuiz,
                                80,
                            );
                        } else {
                            user.highestScoreMathQuiz = randomIntFromInterval(
                                user.highestScoreMathQuiz,
                                90,
                            );
                        }

                        user.save();
                    } catch (err) {}
                }, randomIntFromInterval(1, 100) * 1000);
            });

        randomPoint('0 10 * * * *');
        randomPoint('0 16 * * * *');
        // randomPoint('0 20 * * * *');
        // randomPoint('0 34 * * * *');
        // randomPoint('0 45 * * * *');
        // randomPoint('0 52 * * * *');

        //trigger
    }

    // public async shouldFilterData(req: Request) {
    //     const { userid } = req.params;
    //     const { userId: tokenUserId } = req.tokenMeta;
    //     const user = await this.userService.findOne({
    //         _id: ObjectID.createFromHexString(userid),
    //     });

    //     return !(tokenUserId && userid == tokenUserId.toHexString());
    // }

    async createUser(req: Request, res: Response) {
        try {
            if (!_.includes(req.tokenMeta.roles, USER_ROLES.SYSTEM)) {
                throw Error('You are not system');
            }
            const createdUser = await this.userService.create({
                email: req.body.email,
                googleId: '',
                balance: 0,
                highestScoreMathQuiz: 0,
                picture: req.body.picture,
                name: req.body.name,
                availableReceiving: 1000,
                roles: [USER_ROLES.USER],
            });
            // await this.userService.verifyAccountRequest(createdUser.email);
            res.composer.success(createdUser._id);
        } catch (error) {
            res.composer.badRequest(error.message);
        }
    }

    async getUserTransaction(req: Request, res: Response) {
        try {
            const trans = await this.transactionService.getUserTransaction(
                new Types.ObjectId(req.tokenMeta.userId),
            );
            res.composer.success(trans);
        } catch (error) {
            res.composer.badRequest(error.message);
        }
    }

    async resetAllScore() {
        try {
            await this.userService.resetPrivate();
        } catch (error) {}
    }

    async triggerResetDaily() {
        try {
            await this.userService.resetAvailableCoin();
        } catch (error) {}
    }

    async triggerLeaderboard() {
        try {
            const users = await this.userService.triggerLeaderboard();
            if (users.length > 0)
                await this.transactionService.createNewTransaction(
                    SYSTEM_ACCOUNT_ID,
                    users[0]._id,
                    700,
                    `Receive 700Gcoin for 1st place in Math Quiz Leaderboard Daily`,
                );
            if (users.length > 1)
                await this.transactionService.createNewTransaction(
                    SYSTEM_ACCOUNT_ID,
                    users[1]._id,
                    500,
                    `Receive 500Gcoin for 2nd place in Math Quiz Leaderboard Daily`,
                );
            if (users.length > 2)
                await this.transactionService.createNewTransaction(
                    SYSTEM_ACCOUNT_ID,
                    users[2]._id,
                    300,
                    `Receive 300Gcoin for 3rd place in Math Quiz Leaderboard Daily`,
                );
            if (users.length > 3)
                await this.transactionService.createNewTransaction(
                    SYSTEM_ACCOUNT_ID,
                    users[3]._id,
                    200,
                    `Receive 100Gcoin for 4th place in Math Quiz Leaderboard Daily`,
                );
            if (users.length > 4)
                await this.transactionService.createNewTransaction(
                    SYSTEM_ACCOUNT_ID,
                    users[4]._id,
                    200,
                    `Receive 200Gcoin for 5th place in Math Quiz Leaderboard Daily`,
                );
            if (users.length > 5)
                await this.transactionService.createNewTransaction(
                    SYSTEM_ACCOUNT_ID,
                    users[5]._id,
                    200,
                    `Receive 200Gcoin for 6th place in Math Quiz Leaderboard Daily`,
                );
            if (users.length > 6)
                await this.transactionService.createNewTransaction(
                    SYSTEM_ACCOUNT_ID,
                    users[6]._id,
                    200,
                    `Receive 200Gcoin for 7th place in Math Quiz Leaderboard Daily`,
                );
            if (users.length > 7)
                await this.transactionService.createNewTransaction(
                    SYSTEM_ACCOUNT_ID,
                    users[7]._id,
                    200,
                    `Receive 200Gcoin for 8th place in Math Quiz Leaderboard Daily`,
                );
            if (users.length > 8)
                await this.transactionService.createNewTransaction(
                    SYSTEM_ACCOUNT_ID,
                    users[8]._id,
                    200,
                    `Receive 200Gcoin for 9th place in Math Quiz Leaderboard Daily`,
                );
            if (users.length > 9)
                await this.transactionService.createNewTransaction(
                    SYSTEM_ACCOUNT_ID,
                    users[9]._id,
                    200,
                    `Receive 200Gcoin for 10st place in Math Quiz Leaderboard Daily`,
                );
        } catch (error) {}
    }

    async verifyAccountRequest(req: Request, res: Response) {
        // const { email: rawEmail } = req.body;
        // const email = _.trim(rawEmail).toLowerCase().toString();
        // try {
        //     res.composer.success(
        //         await this.userService.verifyAccountRequest(email),
        //     );
        // } catch (error) {
        //     res.composer.badRequest(error.message);
        // }
    }

    async verifyAccount(req: Request, res: Response) {
        // const { verifyAccountCode } = req.body;
        // try {
        //     res.composer.success(
        //         await this.userService.verifyAccount(verifyAccountCode),
        //     );
        // } catch (error) {
        //     res.composer.badRequest(error.message);
        // }
    }

    async getByUsername(req: Request, res: Response) {
        // const { username } = req.params;
        // const { userId: tokenUserId } = req.tokenMeta;
        // try {
        //     const user = await this.userService.findOne({ username });
        //     if (!user) {
        //         res.composer.notFound('User not found');
        //     }
        //     // if (!user.isPublishedProfile && !_.isEqual(tokenUserId, user._id)) {
        //     //     res.composer.notFound('User not published');
        //     //     return;
        //     // }
        //     // if (!user.isPublishedContact && !_.isEqual(tokenUserId, user._id)) {
        //     //     delete user.contact;
        //     // }
        //     // delete user.isPublishedProfile;
        //     // delete user.isPublishedContact;
        //     res.composer.success(user);
        // } catch (error) {
        //     res.composer.badRequest(error.message);
        // }
    }

    async getByKeyword(req: Request, res: Response) {
        // const { keyword } = req.body;
        // try {
        //     const users = await this.userService.find({
        //         $text: { $search: keyword },
        //     });
        //     res.composer.success(users);
        // } catch (error) {
        //     res.composer.badRequest(error.message);
        // }
    }

    async getBundles(req: Request, res: Response) {
        // const { startAfter } = req.query;
        // let { limit = LIMIT_PAGING } = req.query;
        // limit = Math.min(limit, LIMIT_PAGING);
        // const { userid } = req.params;
        // const queryCommand = {
        //     isDeleted: false,
        //     files: { $exists: true, $ne: <any>[] },
        //     user: ObjectID.createFromHexString(userid),
        //     privacy: PrivacyType.PUBLIC,
        //     ...(startAfter && { _id: { $lt: ObjectID.createFromHexString(startAfter) } }),
        // };
        // try {
        //     const bundles =
        //         await this.shouldFilterData(req)
        //             ? []
        //             : await this.bundleService.find(queryCommand, true, +limit);
        //     res.composer.success(bundles);
        // } catch (error) {
        //     res.composer.badRequest(error.message);
        // }
    }

    async getFollowing(req: Request, res: Response) {
        // const { userid } = req.params;
        // const user = await this.userService.findOne({
        //     _id: ObjectID.createFromHexString(userid),
        // });
        // try {
        //     const followingUsers = (await this.shouldFilterData(req))
        //         ? []
        //         : await this.userService.find({ _id: { $in: user.following } });
        //     res.composer.success(followingUsers);
        // } catch (error) {
        //     res.composer.badRequest(error.message);
        // }
    }

    async getFollower(req: Request, res: Response) {
        // const { userid } = req.params;
        // const user = await this.userService.findOne({
        //     _id: ObjectID.createFromHexString(userid),
        // });
        // try {
        //     const followingUsers = (await this.shouldFilterData(req))
        //         ? []
        //         : await this.userService.find({ _id: { $in: user.followers } });
        //     res.composer.success(followingUsers);
        // } catch (error) {
        //     res.composer.badRequest(error.message);
        // }
    }

    async findLeetcodeUser(req: Request, res: Response) {
        const { username } = req.params;
        try {
            const leetcode = new LeetCode();
            const userProfile = await leetcode.user(username);

            res.composer.success({ userProfile });
        } catch (error) {
            res.composer.badRequest(error.message);
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.find();
            res.composer.success(users);
        } catch (error) {
            res.composer.badRequest(error.message);
        }
    }

    async getUserBalance(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const balance = await this.userService.getUserBalance(userId);

            res.composer.success({ balance });
        } catch (error) {
            res.composer.badRequest(error.message);
        }
    }

    async getMe(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const user = await this.userService.findById(userId);

            res.composer.success(user);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async updatePrivate(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const user = await this.userService.findById(userId);
            if (!user) {
                throw new ErrorNotFound('User not found');
            }

            const update = _.pick(req.body, [
                'email',
                'name',
                'phone',
                'university',
                'studentId',
                'dob',
            ]);
            const updatedUser = await this.userService.updatePrivate(
                userId,
                update,
            );
            res.composer.success(updatedUser);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async increaseBalance(req: Request, res: Response) {
        try {
            const { userId, amount } = req.body;
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    balance: amount,
                },
                { new: true },
            );
            res.composer.success(updatedUser);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }
}
