import { Router } from "express";
import { categoryRoutes } from "./category.routes";
import { userRoutes } from "./user.routes";
import { materialRoutes } from "./material.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/category", categoryRoutes)
routes.use("/material", materialRoutes)


export { routes };
