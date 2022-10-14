import { Request, Response } from "express";
import { prisma } from "../database/client";

export class MaterialController {
  async create(req: Request, res: Response) {
    const {
      name,
      presentation,
      userId: userIdString,
      categoryId: categoryIdString,
    } = req.body;
    const userId = parseInt(userIdString);
    const categoryId = parseInt(categoryIdString);

    try {
      const materialCheck = await prisma.material.findFirst({
        where: { name, presentation },
      });

      if (materialCheck) {
        return res.status(401).json("material existe");
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
    const { id, name, presentation, userId, categoryId } = req.body;

    // const id = parseInt(idString)

    const materialCheck = await prisma.material.findUnique({
      where: { id },
    });

    if (!materialCheck) {
      return res.status(400).json("material não existe");
    } else {
      try {
        const material = await prisma.material.update({
          where: { id },
          data: {
            name,
            presentation,
            userId,
            categoryId,
          },
        });

        return res.status(201).json({ material });
      } catch (error) {
        res
          .status(500)
          .json({ Error: "An error was appeared, contact administrator" });
      }
    }
  }

  async listALl(res: Response) {
    const material = await prisma.material.findMany();

    return res.status(200).json({ material });
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
          where:{
            id
          }
        })
        
        return res.status(201).json({Message: "Material was deleted"})   

      } catch (error) {
        const stringError: string = error + "";

        if(stringError.includes("foreign")){
          return res.status(401).json({Error: "Material has a record"})
        }else{
          return res.status(500).json({Error: "error"})
        }
      }
    }
  }
}
