import { Router } from "express";
import { UserController } from "../controller/UserController";
import {ensureAuthenticate} from "../middlewares/ensureAuthenticate";

export const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/", userController.findAll)
userRoutes.post("/create", userController.store);
userRoutes.post("/remove", userController.remove);
userRoutes.put("/",ensureAuthenticate, userController.changePassword)


