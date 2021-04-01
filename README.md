# marvel-character-api

## Install

    git clone git@github.com:chew802/marvel-character-api.git
    cd marvel-character-api
    npm install

## Configure app
Go to https://developer.marvel.com/account# and register a new account if you dont have, after register should see a pair of private and public keys. 
Create a new file name with `.env`, then insert below lines and replace xxxx withe api keys you get from https://developer.marvel.com/account#

    MARVEL_API_PUBLIC_KEY=xxxx
    MARVEL_API_PRIVATE_KEY=xxxx

## Running the project

    npm run start
	
## Testing the project

    npm run test
	
## Prettier and lint the project

    npm run format #prettier
	npm run lint

## Simple build for production

    npm run build

## Swagger Doc of the project

    http://localhost:8080/api-docs/

## Cache
#### Cache-tools
Used `node-cache` for MVP product development, which is fast by using in-memory caching. 
To be scale, it should migrate to more flexible tools, e.g. build a cache server with `redis` with a trade off of adding time communicate with the cache server to allow data cached once and sharable to all api servers. 
Also can consider cache on network layer, e.g. cdn or api gateway. 

#### Cache-strategy
Currently is cached on the api controller level, which is faster for these simple get api. 
While different api might sharing the same request to marvel api, should cache the api response so it sharable & reusable when user calls different api. 

#### Marvel adding new character
For all character ids, can setup a schedule job to check if the cached heroes count align with the latest count. 
For Character information, can set a TTL based on the frequency of character information change to maximize the cache's value. 

#### current vs scaled diagram
![alt text](https://github.com/chew802/marvel-character-api/blob/main/README/current.jpg?raw=true)
![alt text](https://github.com/chew802/marvel-character-api/blob/main/README/scaled.jpg?raw=true)