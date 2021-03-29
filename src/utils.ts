import axios from 'axios';
import apiClient from './apiClient';

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
  
    //combine result after all requests back
    return await axios.all(getCharacterRequests).then(axios.spread((...responses) => {
      return responses.reduce((concatedCharacters, getCharacterResponse) => {
        const ids = (getCharacterResponse?.data?.data?.results?.map(character => character.id));
        return concatedCharacters.concat(ids);
      }, [])
    }));
  });
}