import { Request, Response } from "express";
import { prisma } from "../database/client";
import AppError from "../utils/AppError";

export class MaterialController {
  async create(req: Request, res: Response) {
    const user_id = req.user?.id
    const userId= Number(user_id)

    const {
      name,
      presentation,
      categoryId
    } = req.body;
    console.log(userId, "aqui")

    try {
      const materialCheck = await prisma.material.findFirst({
        where: { name, presentation },
      });

      if (materialCheck) {
        throw new AppError("Material already exists", 400)
        // return res.status(401).json("material existe");
      } else {
        try {
          const material = await prisma.material.create({
            data: {
              name,
              presentation,
              userId,
              categoryId,
            },
          });
          return res.json(material);
        } catch (error) {
          console.log(error);
          return res.status(401).json(error);
        }
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req: Request, res: Response) {
    const { id, name, presentation, categoryId } = req.body;
    const userId = req.user?.id

    // const id = parseInt(idString)

    try {
      const materialCheck = await prisma.material.findUnique({
        where: { id },
      });

      if (!materialCheck) {
        throw new AppError("Material not exist", 401)
      } else {
        const material = await prisma.material.update({
          where: { id },
          data: {
            name,
            presentation,
            userId,
            categoryId,
          },
        });

        return res.status(201).json({material});
      }
    } catch (error) {
      res
        .json(error);
    }
  }

  async listALl(req: Request,res: Response) {
    try{
      const material = await prisma.material.findMany();
  
      return res.json( material );
    }
    catch(error){
      res.json(error)
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.body;

    const materialCheck = await prisma.material.findUnique({
      where: {
        id,
      },
    });

    if (!materialCheck) {
      return res.status(401).json({ Error: "Material não existe" });
    } else {
      try {
        await prisma.material.delete({
          where: {
            id
          }
        })

        return res.status(201).json({ Message: "Material was deleted" })

      } catch (error) {
        const stringError: string = error + "";

        if (stringError.includes("foreign")) {
          return res.status(401).json({ Error: "Material has a record" })
        } else {
          return res.status(500).json({ Error: "error" })
        }
      }
    }
  }
}
