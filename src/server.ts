import express, { Request, Response } from "express";
import { getCharacters, getCharacterById } from "./modules/character/character";

const app = express();
const { PORT = 8080 } = process.env;

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "hello world",
  });
});

app.get("/characters", getCharacters);

app.get("/characters/:characterId", getCharacterById);

app.listen(PORT, () => {
  console.log("server started at http://localhost:" + PORT);
});
