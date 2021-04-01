import Cache from "../../utils/cache";
import { getAllCharacterIds, getCharacter } from "./utils";
import { CharacterIds, Character } from "./type";

const CACHE_KEY = "MARVEL_CHARACTER_IDS";
const CACHE_KEY_PREFIX = "MARVEL_CHARACTER_";

export const getCharacters = async (req, res) => {
  if (Cache.has(CACHE_KEY)) {
    return res.send(Cache.get(CACHE_KEY) as CharacterIds);
  }
  const characterIds: CharacterIds = await getAllCharacterIds();
  Cache.set(CACHE_KEY, characterIds);
  return res.send(characterIds);
};

export const getCharacterById = async (req, res) => {
  const { characterId } = req.params;
  if (isNaN(characterId) || !characterId) {
    return res.status(400).send("Invalid character id");
  }
  const cacheKey = `${CACHE_KEY_PREFIX}${characterId}`;
  if (Cache.has(cacheKey)) {
    return res.send(Cache.get(cacheKey) as Character);
  }
  const character = await getCharacter(characterId);
  if (!character) {
    return res.status(404).send("Character not found");
  }
  Cache.set(cacheKey, character);
  return res.send(character);
};
