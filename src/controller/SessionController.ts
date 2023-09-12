import { prisma } from "../database/client";
import { compare } from "bcryptjs";
import AppError from "../utils/AppError";
import { authConfig } from "../configs/auth";
import { Request, Response } from "express";
import { sign } from 'jsonwebtoken';


export class SessionController {
    async create(req: Request, res: Response) {
        const { userName, password } = req.body;

        try {

            const user = await prisma.user.findUnique({
                where: {
                    userName
                }
            })

            if (!user) {
                throw new AppError("Username or password incorrect", 401)
            }

            const passwordMatch = await compare(password, user.password);

            if (!passwordMatch) {
                throw new AppError("Username or password incorrect", 401)
            }


            const { secret, expiresIn } = authConfig

            const token = sign({}, secret, {
                subject: String(user.id),
                expiresIn
            })
            return res.json({ user, token })
        } catch (error) {
            return res.json({ error })
        }
    }
}