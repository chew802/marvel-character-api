import axios, { AxiosResponse } from "axios";
import md5 from 'md5';

const errorHandler = error => console.log(error);
const requestHandler = request => {
  //set api authorization
  const ts = Date.now();
  const publicKey = process.env.MARVEL_API_PUBLIC_KEY;
  const privateKey = process.env.MARVEL_API_PRIVATE_KEY;
  const hash = md5(`${ts}${privateKey}${publicKey}`);

  return {
    ...request,
    params: {
      ...request.params,
      ts,
      hash,
      apikey: publicKey,
    }
  }
};
const responseHandler = response => response

export default () => {
  //setup marvel api
  const marvelApi = axios.create({
    baseURL: 'https://gateway.marvel.com:443',
  })
  marvelApi.interceptors.response.use(responseHandler, errorHandler);
  marvelApi.interceptors.request.use(requestHandler, errorHandler);

  return {
    getCharacters: (limit = 1, offset = 0, orderBy = 'name'): Promise<AxiosResponse<CharacterData>> => marvelApi.get('/v1/public/characters', { params: { limit, offset, orderBy } })
  }
}

type CharacterData = {
  data: {
    total: number,
    results: {
      id
    }[]
  }
}