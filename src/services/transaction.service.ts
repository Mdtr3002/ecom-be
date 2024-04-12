import { injectable, inject } from 'inversify';
import { ObjectId, Types } from 'mongoose';
import { SYSTEM_ACCOUNT_ID } from '../config';
import Transaction, { TransactionDocument } from '../models/transaction.model';
import { UserDocument } from '../models/user.model';
import { ServiceType } from '../types';
import { UserService } from './user.service';
import { GICAchievementService } from './gic/gic_achievement.service';
import { lazyInject } from '../container';

@injectable()
export class TransactionService {
    @lazyInject(ServiceType.GICAchievement) private gicAchievementService: GICAchievementService

    constructor(
        @inject(ServiceType.User) private userService: UserService,
    ) { }

    async createNewTransaction(
        fromUser: Types.ObjectId,
        toUser: Types.ObjectId,
        amount: number,
        message: string,
    ): Promise<TransactionDocument> {
        // TODO: apply mongoose transaction
        await this.userService.transferBalance(fromUser, toUser, amount);
        const newTransaction = new Transaction({
            fromUser,
            toUser,
            amount,
            message,
            createdAt: Date.now(),
        });
        newTransaction.save();
        this.gicAchievementService.userChangeMoney(fromUser, -amount)
        this.gicAchievementService.userChangeMoney(toUser, amount)
        return newTransaction;
    }

    async createNewTransactionFromSystem(
        toUser: Types.ObjectId,
        amount: number,
        message: string,
    ): Promise<TransactionDocument> {
        // TODO: apply mongoose transaction
        await this.userService.transferBalance(
            SYSTEM_ACCOUNT_ID,
            toUser,
            amount,
        );
        const newTransaction = new Transaction({
            SYSTEM_ACCOUNT_ID,
            toUser,
            amount,
            message,
            createdAt: Date.now(),
        });
        newTransaction.save();
        this.gicAchievementService.userChangeMoney(toUser, amount)
        return newTransaction;
    }

    async createNewTransactionToSystem(
        fromUser: Types.ObjectId,
        amount: number,
        message: string,
    ): Promise<TransactionDocument> {
        // TODO: apply mongoose transaction
        await this.userService.transferBalance(
            fromUser,
            SYSTEM_ACCOUNT_ID,
            amount,
        );
        const newTransaction = new Transaction({
            fromUser,
            SYSTEM_ACCOUNT_ID,
            amount,
            message,
            createdAt: Date.now(),
        });
        this.gicAchievementService.userChangeMoney(fromUser, -amount)
        newTransaction.save();
        return newTransaction;
    }

    async getUserTransaction(
        userId: Types.ObjectId,
    ): Promise<TransactionDocument[]> {
        // TODO: apply mongoose transaction
        const trans = Transaction.find({
            $or: [{ toUser: userId }, { fromUser: userId }],
        })
            .sort({ createdAt: -1 })
            .populate('toUser')
            .populate('fromUser');

        return trans;
    }

    async createNewTransactionGame(
        fromUser: Types.ObjectId,
        toUser: Types.ObjectId,
        amount: number,
        message: string,
    ): Promise<TransactionDocument | boolean> {
        // TODO: apply mongoose transaction
        const isTransfer = await this.userService.transferBalanceGame(
            fromUser,
            toUser,
            amount,
        );
        if (!isTransfer) {
            return true;
        }
        const newTransaction = new Transaction({
            fromUser,
            toUser,
            amount,
            message,
            createdAt: Date.now(),
        });
        newTransaction.save();
        this.gicAchievementService.userChangeMoney(fromUser, -amount)
        this.gicAchievementService.userChangeMoney(toUser, amount)
        return newTransaction;
    }

    async createNewTransactionByDiscordId(
        fromUser: Types.ObjectId,
        toUserDiscordId: string,
        amount: number,
        message: string,
    ): Promise<TransactionDocument> {
        // TODO: apply mongoose transaction
        const userId = await this.userService.transferBalanceByDiscordId(
            fromUser,
            toUserDiscordId,
            amount,
        );
        const newTransaction = new Transaction({
            fromUser,
            toUser: userId,
            amount,
            message,
            createdAt: Date.now(),
        });
        newTransaction.save();
        this.gicAchievementService.userChangeMoney(fromUser, -amount)
        this.gicAchievementService.userChangeMoney(userId, amount)

        return newTransaction;
    }

    async createNewTransactionByDiscordIdP2PBattle(
        fromUserDiscordId: string,
        toUserDiscordId: string,
        amount: number,
    ): Promise<TransactionDocument> {
        // TODO: apply mongoose transaction
        const {
            fromUser,
            toUser,
        }: { fromUser: UserDocument; toUser: UserDocument } =
            await this.userService.transferBalanceByDiscordIdP2P(
                SYSTEM_ACCOUNT_ID,
                toUserDiscordId,
                amount * 2,
            );
        let message = `End Battle transfer to ${toUser.name} ${2 * amount
            }Gcoin`;
        const newTransaction = new Transaction({
            fromUser: SYSTEM_ACCOUNT_ID,
            toUser: toUser._id,
            amount: amount * 2,
            message,
            createdAt: Date.now(),
        });
        newTransaction.save();
        this.gicAchievementService.userChangeMoney(fromUser._id, -amount)
        this.gicAchievementService.userChangeMoney(toUser._id, amount)

        return newTransaction;
    }
}
