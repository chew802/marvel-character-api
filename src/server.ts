import axios from "axios";
import express, { Request, Response } from "express";

import md5 from 'md5';

const app = express();
const { PORT = 8080 } = process.env;
app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "hello world",
  });
});

app.get("/characters", (req, res) => {
  const ts = Date.now();
  const publicKey = process.env.MARVEL_API_PUBLIC_KEY;
  const privateKey = process.env.MARVEL_API_PRIVATE_KEY;
  const hash = md5(`${ts}${privateKey}${publicKey}`);
  const params = {
    ts,
    hash,
    apikey: publicKey,
    orderBy: 'name'
  };
  axios.get('https://gateway.marvel.com:443/v1/public/characters', { params }).then(response => res.send(response?.data?.data?.results.map(character => character.id))).catch(error => console.log(error));
  // res.send([123])
})

app.listen(PORT, () => {
  console.log("server started at http://localhost:" + PORT);
});
