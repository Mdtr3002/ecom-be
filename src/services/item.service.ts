import { injectable } from 'inversify';
import { FilterQuery, ObjectId, QueryOptions, Types, UpdateQuery } from 'mongoose';
import Item, { ItemDocument } from '../models/item.model';
import RandomPool, { RandomPoolDocument } from '../models/random_pool.model';
import { GicItemName, GicRare, GicRarity, gicItems, random } from './gic/utils';

@injectable()
export class ItemService {
    async createMany(
        item: ItemDocument,
        quantity: number,
        // isAutoSendToMarketplace: boolean = false,
    ): Promise<ItemDocument[]> {
        let items = [];
        for (let i = 0; i < quantity; i++) {
            items.push({ ...item });
        }
        items = await Item.insertMany(items);
        // if (isAutoSendToMarketplace) {
        //     const itemIds: string[] = items.map((item) => item._id.toString());
        //     const pool = await RandomPool.findOne();
        //     pool.itemIds = [...itemIds, ...pool?.itemIds];
        //     await pool.save();
        // }
        return items;
    }

    async createNewItem(item: ItemDocument): Promise<ItemDocument> {
        let newItem = new Item();
        const {
            ownerId,
            name,
            imgUrl,
            description,
            currentPrice,
            collectionName,
        } = item;
        newItem.ownerId = ownerId;
        newItem.name = name;
        newItem.imgUrl = imgUrl;
        newItem.description = description;
        newItem.currentPrice = currentPrice;
        newItem.collectionName = collectionName;
        await newItem.save();
        return newItem;
    }

    async getItemById(itemId: Types.ObjectId): Promise<ItemDocument> {
        const item = await Item.findById(itemId);
        return item;
    }

    async getUserItems(userId: string): Promise<ItemDocument[]> {
        const items = await Item.find({ ownerId: userId });
        return items;
    }
    
    async getItemsOfUser(userId: Types.ObjectId) {
        return await Item.find({ ownerId: userId })
    }

    async updateItemById(itemId: string, update: any): Promise<ItemDocument> {
        const updatedItem = await Item.findByIdAndUpdate(itemId, update, {
            new: true,
        });
        return updatedItem;
    }

    async sendItemGIC(itemData: ItemDocument) {
        console.log('Send Item', itemData);
        const item = await this.createNewItem(itemData);
        return item;
    }
    
    async findOne(query: FilterQuery<ItemDocument>) {
        return await Item.findOne(query)
    }
    
    async findOneAndUpdate(query: FilterQuery<ItemDocument>, update: UpdateQuery<ItemDocument>, options: QueryOptions<ItemDocument> = {}) {
        return await Item.findOneAndUpdate(query, update, options)
    }

    getRandomItemWithRare(rarity: GicRarity): GicItemName {
        const rnd = Math.random() * 100000;

        const percent = rnd / 1000;

        let result: GicRare,
            acc = 0;

        Object.keys(rarity).forEach((key: GicRare) => {
            if (result === undefined && percent > 100 - rarity[key] - acc)
                result = key;
            acc += rarity[key];
        });
        console.log('result', result);

        let item = gicItems[random(58)];
        console.log('first item', item);
        while (item.rare != result) {
            console.log('Random', item, result);
            item = gicItems[random(58)];
        }
        console.log('Return', item);
        return item.name;
    }

    createGicRewardItem(userId: Types.ObjectId, itemName: GicItemName) {
        let item: ItemDocument = {
            ownerId: userId,
            name: itemName,
            imgUrl: `https://firebasestorage.googleapis.com/v0/b/gic-web-dev.appspot.com/o/characterPieces%2F${itemName}.png?alt=media`,
            description: `This is a magical item in GicReward called ${itemName}`,
            currentPrice: 0,
            isReceived: false,
            receivedAt: false,
            receivedNote: '',
            isRequestToReceiveItem: false,
            requestToReceiveItemAt: 0,
            collectionName: 'GicReward',
        } as ItemDocument;
        return item;
    }
    
    async deleteOneGicItemOfUser(userId: Types.ObjectId, name: string) {
        return await Item.findOneAndDelete({
            ownerId: userId,
            collectionName: "GicReward",
            name: name
        })
    }
}
