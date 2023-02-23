import { prisma } from "../database/client";
import { compare } from "bcryptjs";
import AppError from "../utils/AppError";
import {AuthConfig} from "../configs/auth";
import { Request, Response } from "express";
import {sign} from 'jsonwebtoken';


export class SessionController{
    async create(req: Request, res: Response){
        const { userName, password} = req.body;


        const user = await prisma.user.findUnique({
            where:{
                userName
            }
        })

        if(!user){
            throw new AppError("Username or password incorrect", 401)
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new AppError("Username or password incorrect", 401)
        }

        const authConfig = new AuthConfig;

        // const token = sign({}, secret, {
        //     subject: String(user.id),
        //     expiresIn
        // })
        // return res.json({user, token})
    }
}