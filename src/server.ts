import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./doc/swagger.json";
import { getCharacters, getCharacterById } from "./modules/character/character";

const app = express();
const { PORT = 8080 } = process.env;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/characters", getCharacters);

app.get("/characters/:characterId", getCharacterById);

app.listen(PORT, () => {
  console.log("server started at http://localhost:" + PORT);
});
