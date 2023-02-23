import { Router } from "express";

import {SessionController} from "../controller/SessionController"
const sessionController = new SessionController();

export const sessionRoutes = Router();
sessionRoutes.post('/', sessionController.create);
