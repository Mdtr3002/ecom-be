import { injectable, inject } from 'inversify';
import { Collection, ObjectId as ObjectID } from 'mongodb';
import _ from 'lodash';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import moment from 'moment';
import mongoose, { FilterQuery, ObjectId, Types } from 'mongoose';
import { DatabaseService } from './database.service';
import { USER_FORBIDDEN_FIELDS } from '../models/user.model';
import { ErrorBalance, ErrorBidInvalid, ErrorUserInvalid } from '../lib/errors';
import {
    HASH_ROUNDS,
    SocialAccountType,
    VERIRY_CODE_TTL,
    VERIFY_CODE_LENGTH,
    EMAIL_SENDER,
} from '../config';
// import { BundleService } from './bundle.service';
import { ServiceType } from '../types';
import { randomPassword, encodeObjectId } from '../lib/helper';
// import { MailService } from '.';
import User, { UserDocument } from '../models/user.model';
import { TransactionService } from './transaction.service';

const USER_CREATE_ALLOW_FIELDS = [
    'password',
    'email',
    'username',
    'firstName',
    'lastName',
];

@injectable()
export class UserService {
    private userCollection: Collection;

    constructor() {
        // @inject(ServiceType.Mail) private mailService: MailService, // @inject(ServiceType.Bundle) private bundleService: BundleService, // @inject(ServiceType.Database) private dbService: DatabaseService,
        // this.userCollection = this.dbService.db.collection('users');
        // this.setupIndexes();
    }

    // private async setupIndexes() {
    //     this.userCollection.createIndex('email', { unique: true });
    //     this.userCollection.createIndex('username', { unique: true });
    //     this.userCollection.createIndex({ name: 'text', username: 'text' });
    // }

    async create(user: any): Promise<UserDocument> {
        const addedUser = new User(user);
        addedUser.save();
        return addedUser;
    }

    async verifyAccountRequest(email: string) {
        let user = null;
        try {
            user = await this.findOne({ email }, true);
        } catch (err) {
            throw new Error(
                `The email address that you've entered doesn't match any account.`,
            );
        }

        const verifyAccountCode = crypto
            .randomBytes(VERIFY_CODE_LENGTH)
            .toString('hex');
        await this.updateOne(user._id, { verifyAccountCode });

        //         return this.mailService.send(
        //             EMAIL_SENDER,
        //             email,
        //             'Verify your account email address',
        //             `Hello Bugdy,

        // Click on the following link to verify your account email address:
        // https://www.bugs.vn/auth/verify-account?verifyAccountCode=${verifyAccountCode}

        // Thanks!
        // - Team BUGS -`,
        //         );
    }

    async verifyAccount(verifyAccountCode: string) {
        // let user = null;
        // try {
        //     user = await this.findOne({ verifyAccountCode }, true);
        // } catch (err) {
        //     throw new Error(
        //         `The email address that you've entered doesn't match any account.`,
        //     );
        // }
        // await this.updateOne(user._id, {
        //     verifyAccountCode: '',
        //     isVerified: true,
        // });
    }

    createSocial(type: SocialAccountType, socialData: any) {
        // const {
        //     id: socialId,
        //     name = '',
        //     email,
        //     first_name,
        //     last_name,
        // } = socialData;
        // const nameInWords = name.split(' ');
        // const userData: User = {
        //     email: `1${type[0]}${socialId}@bugs.vn`,
        //     password: randomPassword(16),
        //     profile: {
        //         firstName: _.isEmpty(first_name)
        //             ? nameInWords.pop()
        //             : first_name,
        //         lastName: _.isEmpty(last_name)
        //             ? nameInWords.join(' ')
        //             : last_name,
        //     },
        //     contact: {
        //         email,
        //     },
        //     isVerified: true,
        //     social: {},
        // };
        // userData.social[type] = socialData;
        // return this.create(userData);
    }

    // async findByKeyword(keyword: string): {
    //     const users = await this.userCollection.find(query).toArray();
    //     return users.map((user) => _.omit(user, USER_FORBIDDEN_FIELDS));
    // }

    async updateOne(userId: ObjectID, data: any) {
        // const opUpdateResult = await this.userCollection.updateOne(
        //     { _id: userId },
        //     { $set: data },
        // );
        // return opUpdateResult.result.nModified;
    }

    async increase(userId: ObjectID, field: string, value: number) {
        // const opUpdateResult = await this.userCollection.updateOne(
        //     { _id: userId },
        //     { $inc: { [field]: value } },
        // );
        // return opUpdateResult.result.nModified;
    }

    async changePassword(
        userId: ObjectID,
        currentPassword: string,
        newPassword: string,
    ) {
        // const user = await this.userCollection.findOne({ _id: userId });
        // const passwordMatch = await bcrypt.compare(
        //     currentPassword,
        //     user.password,
        // );
        // if (!passwordMatch) {
        //     throw new Error('Your current password does not match.');
        // }
        // newPassword = await bcrypt.hash(newPassword, HASH_ROUNDS);
        // const opUpdateResult = await this.userCollection.updateOne(
        //     { _id: userId },
        //     { $set: { password: newPassword } },
        // );
        // return opUpdateResult.result.nModified;
    }

    async follow(userId: ObjectID, followedId: ObjectID) {
        // if (userId === followedId)
        //     throw new Error('Followed user same as user excute.');
        // const followedUser = await this.userCollection.findOne({
        //     _id: followedId,
        // });
        // if (!followedUser) throw new Error('Followed User Not Found');
        // const promises: Array<Promise<any>> = [];
        // promises.push(
        //     this.userCollection.updateOne(
        //         { _id: userId, following: { $nin: [followedId] } },
        //         {
        //             $push: { following: followedId },
        //             $inc: { followingCount: 1 },
        //         },
        //     ),
        // );
        // promises.push(
        //     this.userCollection.updateOne(
        //         { _id: followedId, followers: { $nin: [userId] } },
        //         {
        //             $push: { followers: userId },
        //             $inc: { followerCount: 1 },
        //         },
        //     ),
        // );
        // const results = await Promise.all(promises);
        // return results[0].result.nModified;
    }

    async unfollow(userId: ObjectID, followedId: ObjectID) {
        // if (userId === followedId)
        //     throw new Error('Followed user same as user excute.');
        // // const followedUser = await this.userCollection.findOne({ _id: followedId });
        // // if (!followedUser) throw new Error('Followed User Not Found');
        // const promises: Array<Promise<any>> = [];
        // promises.push(
        //     this.userCollection.updateOne(
        //         { _id: userId, following: { $in: [followedId] } },
        //         {
        //             $pull: { following: followedId },
        //             $inc: { followingCount: -1 },
        //         },
        //     ),
        // );
        // promises.push(
        //     this.userCollection.updateOne(
        //         { _id: followedId, followers: { $in: [userId] } },
        //         {
        //             $pull: { followers: userId },
        //             $inc: { followerCount: -1 },
        //         },
        //     ),
        // );
        // const results = await Promise.all(promises);
        // return results[0].result.nModified;
    }

    async saveBundle(userId: ObjectId, bundleId: ObjectId) {
        // Validate bundle
        // const bundleCount = await this.bundleService.count({ _id: bundleId });
        // if (bundleCount != 1) throw new Error('Invalid bundle id');
        // const updateResult = await this.userCollection.updateOne(
        //     { _id: userId, savedBundles: { $nin: [bundleId] } },
        //     {
        //         $push: { savedBundles: bundleId },
        //     },
        // );
        // if (updateResult.result.nModified != 1)
        //     throw new Error('Bundle already saved');
        // return true;
    }

    async unsaveBundle(userId: ObjectId, bundleId: ObjectId) {
        // const updateResult = await this.userCollection.updateOne(
        //     { _id: userId, savedBundles: { $in: [bundleId] } },
        //     {
        //         $pull: { savedBundles: bundleId },
        //     },
        // );
        // if (updateResult.result.nModified != 1)
        //     throw new Error('Bundle not exist / already deleted');
        // return true;
    }

    async transferBalance(
        fromUser: Types.ObjectId,
        toUser: Types.ObjectId,
        amount: number,
    ): Promise<boolean> {
        const fromUserDoc = await User.findById(fromUser);
        if (fromUserDoc.balance < amount) {
            throw new ErrorBalance();
        }
        fromUserDoc.balance = fromUserDoc.balance - amount;
        fromUserDoc.save();
        await User.findByIdAndUpdate(toUser, { $inc: { balance: amount } });
        return true;
    }

    async transferBalanceGame(
        fromUser: Types.ObjectId,
        toUser: Types.ObjectId,
        amount: number,
    ): Promise<boolean> {
        const targetUser = await User.findById(toUser);
        if (targetUser.highestScoreMathQuiz < amount) {
            targetUser.highestScoreMathQuiz = amount;
        }
        if (targetUser.availableReceiving <= 0) {
            targetUser.save();
            return false;
        }
        targetUser.balance = amount + targetUser.balance;
        await User.findByIdAndUpdate(fromUser, { $inc: { balance: -amount } });

        targetUser.availableReceiving = targetUser.availableReceiving - amount;
        targetUser.markModified('balance');
        targetUser.markModified('availableReceiving');
        targetUser.save();
        return true;
    }

    async transferBalanceByDiscordId(
        fromUser: Types.ObjectId,
        toUserDiscordId: string,
        amount: number,
    ): Promise<Types.ObjectId> {
        const fromUserDoc = await User.findById(fromUser);
        if (fromUserDoc.balance < amount) {
            throw new ErrorBalance();
        }
        fromUserDoc.balance = fromUserDoc.balance - amount;
        fromUserDoc.save();
        const toUser = await User.findOneAndUpdate(
            { discordId: toUserDiscordId },
            { $inc: { balance: amount } },
        );
        return toUser._id;
    }

    async transferBalanceByDiscordIdP2P(
        fromUserId: Types.ObjectId,
        toUserDiscordId: string,
        amount: number,
    ): Promise<{ toUser: UserDocument; fromUser: UserDocument }> {
        const fromUserDoc = await User.findById(fromUserId);
        if (fromUserDoc.balance < amount) {
            throw new ErrorBalance();
        }
        fromUserDoc.balance = fromUserDoc.balance - amount;
        const toUser = await User.findOneAndUpdate(
            { discordId: toUserDiscordId },
            { $inc: { balance: amount } },
        );
        if (!fromUserDoc || !toUser) {
            throw Error('Some Error');
        }
        fromUserDoc.save();
        return { toUser: toUser, fromUser: fromUserDoc };
    }

    async findUserWithDiscordId(id: string) {
        return await User.findOne({ discordId: id });
    }

    async getUserBalance(userId: Types.ObjectId): Promise<number> {
        const { balance } = await User.findById(userId, { balance: 1 });
        return balance;
    }

    async find(): Promise<UserDocument[]> {
        const users = await User.find({});
        return users;
    }

    async findById(
        userId: Types.ObjectId,
        keepAll = false,
    ): Promise<UserDocument> {
        const user = await User.findById(userId);

        // if (_.isEmpty(user)) throw new ErrorUserInvalid('User not found');
        return user;
    }

    async findOne(query: FilterQuery<UserDocument> = {}, keepAll = false): Promise<UserDocument> {
        const user = (await User.findOne(query)) as UserDocument;

        if (_.isEmpty(user)) throw new ErrorUserInvalid('User not found');
        return keepAll
            ? user
            : (_.omit(user, USER_FORBIDDEN_FIELDS) as UserDocument);
    }

    async updatePrivate(
        userId: Types.ObjectId,
        update: {
            email: string;
            name: string;
            phone: string;
            university: string;
            studentId: string;
            dob: string;
        },
    ): Promise<UserDocument> {
        const updatedUser = await User.findByIdAndUpdate(userId, update, {
            new: true,
        });
        //trigger
        return updatedUser;
    }

    async resetPrivate(): Promise<void> {
        await User.find().updateMany({ highestScoreMathQuiz: 0 });
    }

    async resetAvailableCoin(): Promise<void> {
        await User.find().updateMany({ availableReceiving: 1000 });
    }

    async triggerLeaderboard(): Promise<UserDocument[]> {
        const users = await User.find().sort({ highestScoreMathQuiz: -1 });
        return users;
    }

    async getUserInfoByDiscordId(discordId: string): Promise<UserDocument> {
        const user = await User.findOne({ discordId: discordId });
        return user;
    }
}
