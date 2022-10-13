import { Router } from "express";
import { MaterialController } from "../controller/MaterialController";

export const materialRoutes = Router();
const materialController = new MaterialController();

materialRoutes.post("/create", materialController.create)
materialRoutes.put("/update", materialController.update)
materialRoutes.get("/", materialController.listALl)
materialRoutes.delete("/delete", materialController.delete)