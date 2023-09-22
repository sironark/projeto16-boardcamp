import { Router } from "express"
import { getGames } from "../controllers/games.controller.js";

const gamesRouter  = Router();

gamesRouter.get("/games", getGames);
//gamesRouter.post("/games", postGames);

export default gamesRouter;