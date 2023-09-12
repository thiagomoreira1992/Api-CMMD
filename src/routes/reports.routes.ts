import { Router } from "express";
import { ReportsController } from "../controller/ReportsController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

export const reportsRoutes = Router();
const reportsController = new ReportsController();

reportsRoutes.use(ensureAuthenticate)

reportsRoutes.post("/", reportsController.recentMoves)
reportsRoutes.post("/expends", reportsController.mounthExpends)