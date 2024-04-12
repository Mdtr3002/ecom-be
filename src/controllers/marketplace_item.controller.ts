import { Router } from 'express';
import { inject, injectable } from 'inversify';
import _ from 'lodash';
import mongoose, { Types } from 'mongoose';
import { SYSTEM_ACCOUNT_ID } from '../config';

import { ErrorInvalidData } from '../lib/errors';
import {
    AuthService,
    ItemService,
    MarketplaceItemService,
    UserService,
} from '../services';
import { Request, Response, ServiceType } from '../types';
import { Controller } from './controller';

@injectable()
export class MarketplaceController extends Controller {
    public readonly router = Router();
    public readonly path = '/marketplace';

    constructor(
        @inject(ServiceType.Auth) private authService: AuthService,
        @inject(ServiceType.MarketplaceItem)
        private marketplaceItemService: MarketplaceItemService,
        @inject(ServiceType.User) private userService: UserService,
    ) {
        super();

        // Configuring child routes
        this.router.get(
            '/public/items',
            this.getAllMarketplaceItems.bind(this),
        );
        this.router.get(
            '/public/items/:marketplaceItemId',
            this.getMarketplaceItemById.bind(this),
        );

        // Force authenticate all routes
        this.router.all('*', this.authService.authenticate());
        this.router.get(
            '/private/auctioned-items',
            this.getAunctionedItems.bind(this),
        );
        this.router.post('/private/items', this.aunctionNewItem.bind(this));
        this.router.patch(
            '/private/items/:marketplaceItemId',
            this.updateAuctionedItem.bind(this),
        );
        this.router.post('/private/bids', this.bidForItem.bind(this));
        this.router.get('/private/bids', this.getBids.bind(this));
        this.router.post('/private/bids/claim', this.claimBid.bind(this));
    }

    async getAllMarketplaceItems(req: Request, res: Response) {
        try {
            const { collectionName } = req.query;
            const marketplaceItems =
                await this.marketplaceItemService.getAllMarketplaceItems(
                    collectionName,
                );
            res.composer.success(marketplaceItems);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getMarketplaceItemById(req: Request, res: Response) {
        try {
            const { marketplaceItemId } = req.params;
            const item = await this.marketplaceItemService.findById(
                new Types.ObjectId(marketplaceItemId),
            );
            res.composer.success(item);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getAunctionedItems(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const user = await this.userService.findById(userId);

            const auctionedItems =
                await this.marketplaceItemService.getAuctionedItems(user.email);
            res.composer.success(auctionedItems);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async aunctionNewItem(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const { itemId, minPrice, maxPrice, expiredAt, collectionName } =
                req.body;

            if (minPrice >= maxPrice) {
                throw new ErrorInvalidData(
                    'Min price must be less than max price',
                );
            }

            const item = await this.marketplaceItemService.findByItemId(itemId);
            if (item) {
                throw new ErrorInvalidData('Item already in the marketplace');
            }

            const auctionedItem =
                await this.marketplaceItemService.auctionNewItem(
                    userId,
                    itemId,
                    minPrice,
                    maxPrice,
                    expiredAt,
                    collectionName,
                );
            res.composer.success(auctionedItem);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async updateAuctionedItem(req: Request, res: Response) {
        try {
            const { marketplaceItemId } = req.params;
            const update = _.pick(req.body, [
                'minPrice',
                'maxPrice',
                'expiredAt',
            ]);

            // TODO: check min max price when update

            const marketplaceItem = await this.marketplaceItemService.findById(
                new mongoose.Types.ObjectId(marketplaceItemId),
            );
            if (!marketplaceItem) {
                throw new ErrorInvalidData('Marketplace item not exists');
            }

            const updatedItem =
                await this.marketplaceItemService.updateAuctionedItem(
                    marketplaceItemId,
                    update,
                );
            res.composer.success(updatedItem);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async bidForItem(req: Request, res: Response) {
        try {
            const { marketplaceId, bidPrice } = req.body;
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const balance = await this.userService.getUserBalance(userId);
            if (bidPrice > balance) {
                res.composer.badRequest('Not enough balance');
                return;
            }
            const order = await this.marketplaceItemService.bidForItem(
                marketplaceId,
                bidPrice,
                userId,
                SYSTEM_ACCOUNT_ID,
            );
            res.composer.success(order);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getBids(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const bids = await this.marketplaceItemService.getBids(userId);
            res.composer.success(bids);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async claimBid(req: Request, res: Response) {
        try {
            const userId = new Types.ObjectId(req.tokenMeta.userId);
            const { bidId } = req.body;
            const item = await this.marketplaceItemService.claimBid(
                userId,
                bidId,
            );
            res.composer.success(item);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }
}
