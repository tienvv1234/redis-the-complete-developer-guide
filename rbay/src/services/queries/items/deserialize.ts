import type { Item } from '$services/types';
import { DateTime } from 'luxon';

export const deserialize = (id: string, item: { [key: string]: string }): Item => {
    return {
        id,
        name: item.name,
        description: item.description,
        imageUrl: item.imageUrl,
        highestBidUserId: item.highestBidUserId,
        ownerId: item.ownerId,
        createdAt: DateTime.fromMillis(Number(item.createdAt)),
        endingAt: DateTime.fromMillis(Number(item.endingAt)),
        views: parseInt(item.views),
        likes: parseInt(item.likes),
        bids: parseInt(item.bids),
         price: parseFloat(item.price),
    };
};
