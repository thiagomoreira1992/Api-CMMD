import { Router } from "express";
import { SearchController } from "../controller/SearchController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

export const searchRoutes = Router();
const searchController = new SearchController();
searchRoutes.use(ensureAuthenticate)

searchRoutes.post("/", searchController.search)
// searchRoutes.put("/", searchController.update)