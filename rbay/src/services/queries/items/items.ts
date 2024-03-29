import type { CreateItemAttrs } from '$services/types';
import { client } from '$services/redis';
import { serialize } from './serialize';
import { genId } from '$services/utils';
import { itemsKey } from '$services/keys';
import { deserialize } from './deserialize';

export const getItem = async (id: string) => {
    const item = await client.hGetAll(itemsKey(id));

    if(Object.keys(item).length === 0) {
        return null;
    }

    return deserialize(id, item);
};

export const getItems = async (ids: string[]) => {
     const commands = ids.map(id => {
         return client.hGetAll(itemsKey(id));
     });

    const results = await Promise.all(commands);

    return results.map((item, index) => {
        if(Object.keys(item).length === 0) {
            return null;
        }

        return deserialize(ids[index], item);
    });
};

export const createItem = async (attrs: CreateItemAttrs) => {
    const id = genId();
    console.log(attrs);
    const serialized = serialize(attrs);

    await client.hSet(itemsKey(id), serialized);

    return id;  
};
 
