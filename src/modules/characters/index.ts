import NodeCache from 'node-cache';
import { getAllCharacterIds, getCharacter } from './utils';
import { CharacterIds, Character } from './type';

const cache = new NodeCache();
const CACHE_KEY = 'MARVEL_CHARACTER_IDS';
const CACHE_KEY_PREFIX = 'MARVEL_CHARACTER_';

export const getCharacters = async (req, res) => {
  if (cache.has(CACHE_KEY)) {
    return res.send(cache.get<CharacterIds>(CACHE_KEY))
  }
  const characterIds: CharacterIds = await getAllCharacterIds();
  cache.set(CACHE_KEY, characterIds)
  res.send(characterIds);

}

export const getCharacterById = async (req, res) => {
  const { characterId } = req.params;
  const cacheKey = `${CACHE_KEY_PREFIX}${characterId}`;
  if(!characterId) {
    throw new Error('Please provide character id');
  }
  if(cache.has(cacheKey)) {
    return res.send(cache.get<Character>(cacheKey));
  }
  const character = await getCharacter(characterId);
  cache.set(cacheKey, character);
  res.send(character);
}