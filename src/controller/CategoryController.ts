import { Request, Response } from "express";
import { prisma } from "../database/client";

export class CategoryController {
  async store(req: Request, res: Response) {
    const { name, priority } = req.body;

    console.log(typeof(priority))

    // const priority = parseInt(priorityString);

    try {
      const category = await prisma.category.create({
        data: {
          name,
          priority,
        },
      });

      return res.status(201).json({ category });
    } catch (Error) {
      console.log(Error);
      return res.status(401).json({ Error: "Category already exists" });
    }
  }

  async update(req: Request, res: Response) {
    const { name, newName, newPriority: newPriorityString } = req.body;

    const newPriority = parseInt(newPriorityString);

    try {
      const checkCategory = await prisma.category.findUnique({
        where: {
          name,
        },
      });

      console.log(checkCategory);
      if (!checkCategory) {
        return res.status(401).json({ Error: " Category not found" });
      } else {
        const category = await prisma.category.update({
          where: {
            name,
          },
          data: {
            name: newName,
            priority: newPriority,
          },
        });

        console.log(category);
        return res.status(201).json({ category });
      }
    } catch (Error) {
      console.log(Error);
      return res
        .status(500)
        .json({ Error: " An error was appeared, contact administrator" });
    }
  }

  async delete(req: Request, res: Response) {
    const { name } = req.body;

    try {
      const checkCategory = await prisma.category.findUnique({
        where: {
          name,
        },
      });

      if (!checkCategory) {
        return res.status(401).json({ Error: "Category not found" });
      } else {
        try {
          const category = await prisma.category.delete({
            where: {
              id: checkCategory.id,
            },
          });

          console.log(category);
          return res.status(201).json({ Message: "Category deleted" });
        } catch (Error) {
          const stringError: string = Error + "";
          if (stringError.includes("foreign")) {
            return res
              .status(401)
              .json({
                Error: "This category has a material, verify the delete order",
              });
          }
          console.log(Error);
          return res.status(401).json(Error);
        }
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ Error: "An error was appeared, contact administrator" });
    }
  }

  async findAll(req: Request, res: Response){
    const categories = await prisma.category.findMany();

    return res.status(201).json(categories);
  }
}
