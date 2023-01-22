import { Request, Response} from "express";
import { prisma } from "../database/client";
import AppError from "../utils/AppError";

export class RecordController {

    async listAll(req: Request, res: Response) {
        const records = await prisma.record.findMany();

        return res.status(202).json({records});
    }

    async create(req: Request, res: Response) {
        const { batch, materialId, expires: expiresString, quantity, userId } = req.body;

        const expires = new Date(expiresString)

        try {
            const record = await prisma.record.create({
                data: {
                    batch,
                    materialId,
                    expires,
                    quantity,
                    userId
                },
            })

            return res.status(201).json({ record })
        } catch (Error: any) {
            if (Error.code == 'P2002') {
                return res.status(401).json("Unique key Batch has a register")
            }
            return res.json({ Error })
        }


    }

    async update(req: Request, res: Response) {
        const { recordId, batch, expires: expiresString, quantity, userId } = req.body;

        const expires = new Date(expiresString)

        try {
            const hasMovement = await prisma.movement.findFirst({
                where: {
                    recordId
                }
            })

            if (hasMovement) {
                throw new AppError("This Record has a movement registered", 401)
            }



            const record = await prisma.record.findUnique({
                where: {
                    id: recordId
                }
            })

            const userHasRecord = record?.userId === userId;

            if (!userHasRecord) {
                throw new AppError("This Record has been inserted by another user", 401)
            }

            const update = await prisma.record.update({
                where: {
                    id: recordId
                }, data: {
                    batch,
                    expires,
                    quantity
                }
            })

            return res.status(200).json({ update })
        } catch (Error: any) {
            
            console.log(typeof(Error))
            return res.status(Error.statusCode).json(Error)
        }

    }

    async delete(req: Request, res: Response) {
        const { recordId, userId } = req.body;

        try {
            const hasMovement = await prisma.movement.findFirst({
                where: {
                    recordId
                }
            })

            if (hasMovement) {
                throw new AppError("This Record has a movement registered", 401)
            }



            const record = await prisma.record.findUnique({
                where: {
                    id: recordId
                }
            })

            const userHasRecord = record?.userId === userId;

            if (!userHasRecord) {
                throw new AppError("This Record has been inserted by another user", 401)
            }

            const remove = await prisma.record.delete({
                where: {
                    id: recordId
                }
            })

            return res.status(201).json({ remove })

        } catch (Error: any) {
            return res.status(Error.statusCode).json({ Error })
        }
    }

}