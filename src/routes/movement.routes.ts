import { Router } from "express";
import { MovementController } from "../controller/MovementController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

export const movementRoutes = Router();
const movementController = new MovementController();
movementRoutes.use(ensureAuthenticate)

movementRoutes.post("/", movementController.create)
// movementRoutes.put("/", movementController.update)
movementRoutes.get("/", movementController.listAll)
// movementRoutes.delete("/", movementController.delete)