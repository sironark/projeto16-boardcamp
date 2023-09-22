import { Router } from "express";
import { getRentals } from "../controllers/rentals.controller.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);/*
rentalsRouter.post("/rentals", postRentals);
rentalsRouter.post("/rentals/:id/return", postFinishRental);
rentalsRouter.delete("/rentals/:id". deleteRental);*/

export default rentalsRouter;