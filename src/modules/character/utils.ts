import axios from 'axios';
import apiClient from '../../api/apiClient';
import { Character } from './type';

export const getAllCharacterIds = async (): Promise<number[]> => {
  const api = apiClient();
  const pageSize = 100;
  //get total count of character
  return await api.getCharacters().then(async response => {
  
    const totalCharacters = response?.data?.data?.total || 0;
    const totalPage = Math.ceil(totalCharacters / pageSize);
  
    // send request to fetch all pages in parallel
    const getCharacterRequests = [];
    for (let page = 1;page <= totalPage; page++) {
      const offset = (page - 1) * pageSize
      getCharacterRequests.push(api.getCharacters(pageSize, offset));
    }
  
    //combine result after all requests returned
    return await axios.all(getCharacterRequests).then(axios.spread((...responses) => {
      return responses.reduce((concatedCharacters, getCharacterResponse) => {
        const ids = (getCharacterResponse?.data?.data?.results?.map(character => character.id));
        return concatedCharacters.concat(ids);
      }, [])
    }));
  });
}

export const getCharacter = async (characterId):Promise<Character> => {
  const api = apiClient();
  return await api.getCharacterById(characterId).then(response => {
    const character = response?.data?.data?.results?.[0];
    return {
      id: character?.id,
      name: character?.name,
      description: character?.description
    }    
  })
}