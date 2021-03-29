import NodeCache from 'node-cache';
import { getAllCharacterIds } from './utils';

const cache = new NodeCache();

export const getCharacters = async (req, res) => {
    const CACHE_KEY = 'MARVEL_CHARACTER_IDS';
    if (cache.has(CACHE_KEY)) {
        return res.send(cache.get(CACHE_KEY))
    }
    console.log('getting character ids');
    const characterIds = await getAllCharacterIds();
    cache.set(CACHE_KEY, characterIds)
    res.send(characterIds);

}
