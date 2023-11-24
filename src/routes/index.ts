import { Router } from "express";
import { categoryRoutes } from "./category.routes";
import { userRoutes } from "./user.routes";
import { materialRoutes } from "./material.routes";
import { recordRoutes } from "./records.routes";
import { movementRoutes } from "./movement.routes";
import {sessionRoutes} from "./session.routes"
import { reportsRoutes } from "./reports.routes";
import { searchRoutes } from "./search.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/category", categoryRoutes)
routes.use("/material", materialRoutes)
routes.use("/records", recordRoutes);
routes.use("/movements", movementRoutes);
routes.use("/session", sessionRoutes)
routes.use("/reports", reportsRoutes)
routes.use("/search", searchRoutes)


export { routes };
