import Cache from '../../utils/cache';
import { getAllCharacterIds, getCharacter } from './utils';
import { CharacterIds, Character } from './type';

const CACHE_KEY = 'MARVEL_CHARACTER_IDS';
const CACHE_KEY_PREFIX = 'MARVEL_CHARACTER_';

export const getCharacters = async (req, res) => {
  if (Cache.has(CACHE_KEY)) {
    return res.send(Cache.get(CACHE_KEY) as CharacterIds)
  }
  const characterIds: CharacterIds = await getAllCharacterIds();
  Cache.set(CACHE_KEY, characterIds)
  res.send(characterIds);
}

export const getCharacterById = async (req, res) => {
  const { characterId } = req.params;
  const cacheKey = `${CACHE_KEY_PREFIX}${characterId}`;
  if(!characterId) {
    throw new Error('Please provide character id');
  }
  if(Cache.has(cacheKey)) {
    return res.send(Cache.get(cacheKey) as Character);
  }
  const character = await getCharacter(characterId);
  Cache.set(cacheKey, character);
  res.send(character);
}