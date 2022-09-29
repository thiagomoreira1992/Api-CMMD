import { Router } from "express";
import { CategoryController } from "../controller/CategoryController";

const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.post("/create", categoryController.store);
categoryRoutes.put("/update", categoryController.update);
categoryRoutes.delete("/delete", categoryController.delete);
categoryRoutes.get("/", categoryController.findAll)

export { categoryRoutes };
