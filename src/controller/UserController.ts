import { Request, Response } from "express";
import { prisma } from "../database/client";
import { hash, compare } from 'bcryptjs';
import AppError from "../utils/AppError";

export class UserController {
  async store(req: Request, res: Response) {
    const { userName, password } = req.body;

    const hashedPassword = await hash(password, 8)

    try {
      const user = await prisma.user.create({
        data: {
          userName,
          password: hashedPassword,
        },
      });

      return res.status(201).json(user);
    } catch (err) {
      console.log(err)
      return res.status(400).json({ userName: "Already exists" });
    }
  }

  async remove(req: Request, res: Response) {
    const { userName } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          userName,
        },
      });

      if (!user) {
        throw new Error("User doesn't exists");
      } else {
        try {
          await prisma.user.delete({
            where: {
              id: user.id,
            },
          });
          return res.status(201).json("User was deleted!");
        } catch (Error) {
          return res
            .status(401)
            .json({ Error: "User found but cannot be deleted" });
        }
      }
    } catch (Error) {
      return res.status(401).json({ Error: "User doesn't exists" });
    }
  }

  async changePassword(req: Request, res: Response) {
    const { oldPassword, newPassword } = req.body;
    const id = req.user?.id

    try {

      if (!oldPassword || !newPassword) {
        throw new AppError('The password or the new password is empty', 400)
      }

      const hashedNewPassword = await hash(newPassword, 8)
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        return res.status(401).json({ Error: "User doesn't exists" });
      }
      const checkOldPassword = oldPassword === newPassword

      const oldPasswordMatch = await compare(oldPassword, user?.password);

      if (checkOldPassword) {
        return res
          .status(400)
          .json({ Error: "New password must be  different from the new one" });
      }

      if (!oldPasswordMatch) {
        // return res.status(401).json({ Error: "Incorrect Password" });
        throw new AppError("The current password is incorrect", 401)
      } else {

        await prisma.user.update({
          where: {
            id,
          },
          data: {
            password: hashedNewPassword,
          },
        });

        const checkPassword = await prisma.user.findUnique({
          where: {
            id,
          },
        });

        if (!checkPassword) {
          throw new AppError("erro", 401)
          console.log("aqui")
        } else {
          if (await compare(newPassword, checkPassword.password)) {
            return res.status(201).json("Password has ben changed");
          }
        }

      }

    } catch (Error) {
      return res
        .json({ Error });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();

      return res.status(201).json({ users })
    } catch (error) {
      return res.status(500).json({ Error: "An error was appeared, contact administrator" })
    }
  }
}
