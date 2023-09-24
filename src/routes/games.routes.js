import { Router } from "express"
import { getGames, postGames } from "../controllers/games.controller.js";
import { validateSchema } from "../middlewares/validate.schema.js";
import { postGameSchema } from "../schemas/app.schemas.js";

const gamesRouter  = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games",validateSchema(postGameSchema), postGames);

export default gamesRouter;