import { Router } from "express";
import { MaterialController } from "../controller/MaterialController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

export const materialRoutes = Router();
const materialController = new MaterialController();

materialRoutes.use(ensureAuthenticate)

materialRoutes.post("/", materialController.create)
materialRoutes.put("/", materialController.update)
materialRoutes.get("/", materialController.listALl)
materialRoutes.delete("/", materialController.delete)