import { Router } from "express";
import { MovementController } from "../controller/MovementController";

export const movementRoutes = Router();
const movementController = new MovementController();

movementRoutes.post("/", movementController.create)
// movementRoutes.put("/", movementController.update)
movementRoutes.get("/", movementController.listAll)
// movementRoutes.delete("/", movementController.delete)