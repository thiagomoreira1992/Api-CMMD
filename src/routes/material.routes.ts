import { Router } from "express";
import { MaterialController } from "../controller/MaterialController";

export const materialRoutes = Router();
const materialController = new MaterialController();

materialRoutes.post("/create", materialController.create)