import { prisma } from "../database/client";
import { compare } from "bcryptjs";
import AppError from "../utils/AppError";
import { authConfig } from "../configs/auth";
import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";

export class SessionController {
  async create(req: Request, res: Response) {
    const { userName, password } = req.body;
    console.log(userName, password);

    try {
      const user = await prisma.user.findUnique({
        where: {
          userName,
        },
      });

      if (!user) {
        throw new AppError("Username or password incorrect", 401);
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        throw new AppError("Username or password incorrect", 401);
      }

      const { secret, expiresIn } = authConfig;

      const token = sign({}, secret, {
        subject: String(user.id),
        expiresIn,
      });
      console.log(user, token);
      return res.json({ user, token });
    } catch (AppError) {
      return res.status(401).json(AppError);
    }
  }

  isAuthenticated(req: Request, res: Response) {
    const authHeader= req.headers.authorization!;
    
    if(!authHeader){
      throw new AppError("Request is missing")
    }
    const [, token] = authHeader.split(" ");
    console.log(token)

    if (!token) {
        throw new AppError("JWT Token is invalid", 401);
      }
    try {
      const decoded = verify(token, authConfig.secret);

      console.log(decoded)
      res.status(200).json({decoded})
    } catch (e) {
      res.status(400).json({e});
    }
  }
}
