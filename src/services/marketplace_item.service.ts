import { injectable, inject } from 'inversify';
import {
    ErrorBidInvalid,
    ErrorInvalidData,
    ErrorItemInvalid,
    ErrorUserInvalid,
} from '../lib/errors';

import MarketplaceItem, {
    MarketplaceItemDocument,
} from '../models/marketplace_item.model';
import Item, { ItemDocument } from '../models/item.model';
import User, { UserDocument } from '../models/user.model';
import Order, { OrderDocument } from '../models/order.model';
import Transaction from '../models/transaction.model';
import { ServiceType } from '../types';
import { TransactionService } from './transaction.service';
import { UserService } from './user.service';
import { ItemService } from './item.service';
import { SYSTEM_ACCOUNT_ID } from '../config';
import { ObjectId, Query, Types } from 'mongoose';

@injectable()
export class MarketplaceItemService {
    constructor(
        @inject(ServiceType.Transaction)
        private transactionService: TransactionService,
        @inject(ServiceType.User) private userService: UserService,
        @inject(ServiceType.Item) private itemService: ItemService,
    ) {}

    async auctionNewItem(
        userId: Types.ObjectId,
        itemId: ObjectId,
        minPrice: number,
        maxPrice: number,
        expiredAt: number,
        collectionName: string,
    ): Promise<MarketplaceItemDocument> {
        const item: ItemDocument = await Item.findById(itemId);
        if (!item) {
            throw new ErrorItemInvalid('Invalid item');
        }
        console.log('Owner: ', item.ownerId);
        console.log('UserId: ', userId);
        if (!item.ownerId.equals(userId)) {
            throw new ErrorUserInvalid('User not authorized');
        }
        const owner = await User.findById(userId);

        const newMarketplaceItem = new MarketplaceItem({
            itemId: item._id.toString(),
            minPrice: minPrice,
            maxPrice: maxPrice,
            currentPrice: minPrice,
            createdAt: Date.now(),
            expiredAt: expiredAt,
            collectionName: collectionName,
            ownerName: owner.email, // TODO: change to owner.username when available
        });

        await newMarketplaceItem.save();
        return newMarketplaceItem;
    }

    async updateAuctionedItem(
        marketplaceItemId: string,
        update: {
            minPrice?: number;
            maxPrice?: number;
            expiredAt?: number;
        },
    ) {
        const updatedItem = await MarketplaceItem.findByIdAndUpdate(
            marketplaceItemId,
            update,
            { new: true },
        );
        return updatedItem;
    }

    async bidForItem(
        marketplaceId: string,
        bidPrice: number,
        fromUser: Types.ObjectId,
        toUser: Types.ObjectId,
    ): Promise<OrderDocument> {
        const marketplaceItem = await MarketplaceItem.findById({
            _id: marketplaceId,
        });

        const {
            itemId,
            currentPrice,
            currentBidUserId,
            minPrice,
            maxPrice,
            priceHistory,
            ownerName,
            expiredAt,
        } = marketplaceItem;

        if (expiredAt < Date.now()) {
            throw new ErrorInvalidData('Expired, cannot make a bid');
        }

        const owner: UserDocument = await this.userService.findOne({
            email: ownerName,
        });

        if (fromUser.equals(owner._id)) {
            throw new ErrorInvalidData('You cannot buy your item.');
        }

        if (bidPrice < minPrice) {
            throw new ErrorInvalidData(
                'Bid price must be greater than or equal to min price',
            );
        }

        // Between min and max price
        // Compare with currentPrice
        if (bidPrice < currentPrice * 1.1) {
            throw new ErrorInvalidData(
                'Bid price must be greater than current price 10%',
            );
        }

        const toUserDoc = await this.userService.findById(toUser);

        if (toUserDoc.balance < bidPrice) {
            throw new ErrorBidInvalid('Your balance not enough');
        }

        // Create new order -> new transaction
        const newOrder = new Order();
        newOrder.description = `${toUserDoc.name} Bid an item Id: ${itemId} of ${ownerName}`;
        newOrder.status = 'success';
        newOrder.marketplaceItemId = itemId;
        // Transfer money to system account
        const newTransaction =
            await this.transactionService.createNewTransaction(
                fromUser,
                toUser,
                bidPrice,
                `You have to transfer ${bidPrice} GCoins to the bidding system for bidding.`,
            );

        // Refund user currently bidding
        if (priceHistory.length > 0) {
            const prevBidder = await this.userService.findOne({
                email: priceHistory[0].email,
            });
            const refundTransaction =
                await this.transactionService.createNewTransaction(
                    toUser,
                    prevBidder._id.toString(),
                    priceHistory[0].price,
                    `Bidding system refund ${priceHistory[0].price} GCoins for you because someone bid higher than you`,
                );
        }
        newOrder.transactionId = newTransaction._id.toString();
        await newOrder.save();
        // Write priceHistory of marketplaceItem
        const { email, name } = await User.findById(fromUser, { email: 1 });
        priceHistory.unshift({
            email,
            name,
            createdAt: Date.now(),
            price: bidPrice,
        });
        marketplaceItem.currentPrice = bidPrice;
        marketplaceItem.currentBidUserId = fromUser;
        if (!marketplaceItem.followedUsers.includes(fromUser)) {
            marketplaceItem.followedUsers.push(fromUser);
        }
        await marketplaceItem.save();
        return newOrder;

        // if (bidPrice >= maxPrice) {
        //     // If item is bought, write to priceHistory of item
        //     const newOrder = new Order();
        //     const item = await this.itemService.getItemById(itemId);
        //     newOrder.description = `Successfully purchased ${item.name} in ${item.collectionName} from Bidding System`;
        //     newOrder.status = 'success';
        //     newOrder.marketplaceItemId = itemId;
        //     // Transfer money from bidder to system account
        //     const newTransaction =
        //         await this.transactionService.createNewTransaction(
        //             fromUser,
        //             toUser,
        //             bidPrice,
        //             `You have to transfer ${bidPrice}GCoin to the bidding system for bidding.`,
        //         );

        //     // THIS MAY NEED IMPLEMENT IN FUTURE FOR OTHER USER PLACE A BIDDING //
        //     // Transer money from system account to item's owner
        //     // const item = await this.itemService.getItemById(itemId);
        //     // const newTrans = await this.transactionService.createNewTransaction(
        //     //     toUser,
        //     //     item.ownerId,
        //     //     bidPrice,
        //     // );

        //     // Refund user currently bidding
        //     if (priceHistory.length > 0) {
        //         const prevBidder = await this.userService.findOne({
        //             email: priceHistory[0].email,
        //         });
        //         const refundTransaction =
        //             await this.transactionService.createNewTransaction(
        //                 toUser,
        //                 prevBidder._id.toString(),
        //                 priceHistory[0].price,
        //                 `Bidding system refund ${priceHistory[0].price} for you because someone bid the highest price`,
        //             );
        //     }
        //     newOrder.transactionId = newTransaction._id.toString();
        //     await newOrder.save();
        //     // Write priceHistory of marketplaceItem
        //     const { email, name } = await User.findById(fromUser, { email: 1 });
        //     priceHistory.unshift({
        //         email,
        //         name,
        //         createdAt: Date.now(),
        //         price: bidPrice,
        //     });
        //     // Remove marketplace item
        //     // TODO: claimed = true
        //     marketplaceItem.expiredAt = Date.now();
        //     if (!marketplaceItem.followedUsers.includes(fromUser)) {
        //         marketplaceItem.followedUsers.push(fromUser);
        //     }
        //     await marketplaceItem.save();

        //     // Change owner of item, write priceHistory of item
        //     item.ownerId = fromUser;
        //     item.priceHistory.unshift({
        //         email,
        //         name,
        //         createdAt: Date.now(),
        //         price: bidPrice,
        //     });
        //     await item.save();
        //     return newOrder;
        // }
    }

    async getAllMarketplaceItems(collectionName?: any) {
        let query: any = {
            claimed: false,
        };
        if (collectionName) {
            query = {
                ...query,
                collectionName: collectionName,
            };
        }
        const marketplaceItems = await MarketplaceItem.find(query)
            .sort({
                expiredAt: -1,
            })
            .populate('itemId');
        return marketplaceItems;
    }

    async getAuctionedItems(
        ownerName: string,
    ): Promise<MarketplaceItemDocument[]> {
        const auctionedItems = await MarketplaceItem.find({ ownerName });

        return auctionedItems;
    }

    async getBids(userId: Types.ObjectId): Promise<MarketplaceItemDocument[]> {
        // user get bid that they have involved
        // if user own bid of bids, that bid will be showed until claimed
        let bids = await MarketplaceItem.find({
            followedUsers: { $elemMatch: { $eq: userId } },
            claimed: false,
        }).populate('itemId');

        // TODO: FE check if user owns bid, and if user has claim bid or not (userId ===currentBidUserId, claimed===true)

        return bids;
    }

    async findByItemId(itemId: Types.ObjectId) {
        const item = await MarketplaceItem.findOne({ itemId });
        return item;
    }

    async findById(marketplaceItemId: Types.ObjectId) {
        const marketplaceItem = await MarketplaceItem.findById(
            marketplaceItemId,
        ).populate('itemId');
        return marketplaceItem;
    }

    async claimBid(userId: Types.ObjectId, bidId: Types.ObjectId) {
        // Check if user is the current bid user
        const bid = await MarketplaceItem.findById(bidId);
        if (!bid.currentBidUserId.equals(userId)) {
            throw new ErrorInvalidData('You not own this bid');
        }

        // Check if it's right time or not?
        if (bid.expiredAt > Date.now()) {
            throw new ErrorInvalidData(
                'Bid time has not expired, cannot claim item',
            );
        }

        // FUTURE FEATURESSSSSSS ///
        // // Find previous owner
        // const prevOwner = await this.userService.findOne({
        //     email: bid.ownerName,
        // });

        // // Transfer money from system account to previous owner
        // const newTransaction =
        //     await this.transactionService.createNewTransaction(
        //         SYSTEM_ACCOUNT_ID,
        //         prevOwner._id.toString(),
        //         bid.currentPrice,
        //     );

        // Update owner of item
        const item = await this.itemService.getItemById(bid.itemId);
        item.ownerId = userId;
        const user = await this.userService.findById(userId);
        item.priceHistory.push({
            email: user.email,
            name: user.name,
            createdAt: Date.now(),
            price: bid.currentPrice,
        });
        await item.save();
        bid.claimed = true;
        await bid.save();
    }
}
