import {  NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { verify } from "jsonwebtoken";
import { authConfig } from "../configs/auth";

declare module 'express-serve-static-core'{
        interface Request {
            user?: {id?: number}
        }
    }


export function ensureAuthenticate(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("JWT Token is invalid", 401)
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, authConfig.secret)

        req.user = {
            id: Number(user_id)
        }
       
        return next();
    } catch(error){

        return res.json({error})
        // throw new AppError("JWT Token hasn't informed", 401)
    }

}
// export function applyServerHardening(app:  Express):void {
//     app.disable('x-powered-by');

//     app.use(ensureAuthenticate)
// }
