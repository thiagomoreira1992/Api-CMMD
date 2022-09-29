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
        where: {name, presentation,
        },
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
  

//   async update(req: Request, res: Response){
//       const
//   }
}
