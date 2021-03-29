import express, { Request, Response } from "express";
import { getCharacters } from './characters';

import md5 from 'md5';

const app = express();
const { PORT = 8080 } = process.env;

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "hello world",
  });
});

app.get("/characters", getCharacters)

app.listen(PORT, () => {
  console.log("server started at http://localhost:" + PORT);
});
