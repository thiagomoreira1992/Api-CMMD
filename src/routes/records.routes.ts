import { Router } from "express";
import { RecordController } from "../controller/RecordController";

export const recordRoutes = Router();
const recordController = new RecordController();

recordRoutes.post("/", recordController.create)
recordRoutes.put("/", recordController.update)
recordRoutes.get("/", recordController.listAll)
recordRoutes.delete("/", recordController.delete)