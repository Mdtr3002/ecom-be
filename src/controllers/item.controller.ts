import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from './controller';
import _ from 'lodash';

import { Request, Response, ServiceType } from '../types';
import {
    AuthService,
    ItemService,
    MarketplaceItemService,
    UserService,
} from '../services';
import { ItemDocument } from '../models/item.model';
import { USER_ROLES } from '../models/user.model';
import { ErrorUserInvalid } from '../lib/errors';
import mongoose, { ObjectId, Types } from 'mongoose';

@injectable()
export class ItemController extends Controller {
    public readonly router = Router();
    public readonly path = '/';

    constructor(
        @inject(ServiceType.Auth) private authService: AuthService,
        @inject(ServiceType.Item) private itemService: ItemService,
        @inject(ServiceType.User) private userService: UserService,
        @inject(ServiceType.MarketplaceItem)
        private marketplaceItemService: MarketplaceItemService,
    ) {
        super();

        // Configuring child routes
        this.router.get('/public/items/:itemId', this.getItemById.bind(this));

        // Force authenticate all routes
        this.router.all('*', this.authService.authenticate());
        this.router.post('/private/items', this.createNewItem.bind(this));
        this.router.get('/private/items', this.getUserItems.bind(this));
        this.router.post('/private/received', this.receivedRealItem.bind(this));
        // this.router.patch(
        //     '/private/items/:itemId',
        //     this.updateItemById.bind(this),
        // );
    }

    async createNewItem(req: Request, res: Response) {
        try {
            const item = _.pick(req.body, [
                'name',
                'imgUrl',
                'description',
                'currentPrice',
                'collectionName',
            ]) as any;
            const ownerId = new Types.ObjectId(req.tokenMeta.userId);
            // TODO
            const user = await this.userService.findById(ownerId);
            if (!_.includes(user.roles, USER_ROLES.SUPER_ADMIN)) {
                throw new ErrorUserInvalid('User not allow to create new item');
            }
            item.ownerId = ownerId;

            if (req.body.quantity) {
                const items = await this.itemService.createMany(
                    item,
                    req.body.quantity,
                );
                if (req.body.isMoveToMarketplace) {
                    const itemIds: ObjectId[] = items.map((item) => item._id);
                    itemIds.map(async (itemId) => {
                        await this.marketplaceItemService.auctionNewItem(
                            ownerId,
                            itemId,
                            req.body.minPrice,
                            req.body.maxPrice,
                            req.body.expiredAt,
                            req.body.collectionName,
                        );
                    });
                }
                res.composer.success(`Created ${req.body.quantity} new items`);
                return;
            }

            const newItem = await this.itemService.createNewItem(item);
            res.composer.success(newItem);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getItemById(req: Request, res: Response) {
        try {
            const { itemId } = req.params;

            const item = await this.itemService.getItemById(
                new mongoose.Types.ObjectId(itemId),
            );
            res.composer.success(item);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async getUserItems(req: Request, res: Response) {
        try {
            // const user = req.tokenMeta as UserDocument;
            const userId = req.tokenMeta.userId.toString();

            const items = await this.itemService.getUserItems(userId);

            return res.composer.success(items);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async updateItemById(req: Request, res: Response) {
        try {
            const { itemId } = req.params;
            const update = _.pick(req.body, [
                'name',
                'imgUrl',
                'description',
                'value',
            ]);
            const updatedItem = await this.itemService.updateItemById(
                itemId,
                update,
            );
            res.composer.success(updatedItem);
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }

    async receivedRealItem(req: Request, res: Response) {
        try {
            // const user = req.tokenMeta as UserDocument;
            const userId = new Types.ObjectId(req.tokenMeta.userId.toString());
            const { itemId } = req.body;

            const item = await this.itemService.getItemById(
                new mongoose.Types.ObjectId(itemId),
            );
            if (!item.ownerId.equals(userId)) {
                throw Error('You not the owner of this items');
            }

            if (item.isRequestToReceiveItem) {
                throw Error('You have requested it');
            }
            item.isRequestToReceiveItem = true;
            item.requestToReceiveItemAt = Date.now();
            item.save();
            return res.composer.success('success');
        } catch (error) {
            console.log(error);
            res.composer.badRequest(error.message);
        }
    }
}
