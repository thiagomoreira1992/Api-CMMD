import { Request, Response } from "express";
import AppError from "../utils/AppError";
import { prisma } from "../database/client";

export class SearchController {
  async search(req: Request, res: Response) {
    const { term } = req.body;

    console.log(term)

    try {
      if (!term) {
        throw new AppError("Search term cannot be null!", 401);
      }

      if (term.length < 4) {
        throw new AppError("Search term is too short", 401);
      }

      const materials = await prisma.material.findMany({
        where: {
          name: {
            contains: term,
          },
        },
        select: {
          id: true,
          name: true,
          presentation: true,
          Record: {
            select: {
              id: true,
              batch: true,
              expires: true,
              quantity: true,
            },
            orderBy:{
              quantity: "desc"
            }
          },
        },
      });

      for (let material of materials) {
        let quantity_sum = 0;
        for (let records of material.Record) {
          quantity_sum += records.quantity;
        }
        (material as any).quantity_sum = quantity_sum;
      }

      if(materials.length <= 0){
        return res.json({"message":"Material não localizado"});
      }

      console.log({materials})
      return res.json({ materials });
    } catch (Error: any) {
      res.status(Error.statusCode).json({ Error });
    }
  }
}
