import { Request, Response } from "express";
import { prisma } from "../database/client";
import AppError from "../utils/AppError";

export class MovementController {
    async listAll(req: Request, res: Response) {
        const movements = await prisma.movement.findMany();

        return res.status(202).json({ movements })
    }

    async create(req: Request, res: Response) {
        const { recordId, quantity } = req.body;


        try {
            const record = await prisma.record.findUnique({
                where:{
                    id: recordId
                }
            })

            if(!record){
                throw new AppError("This Record not exists", 401)
            }
            
            if((record.quantity + quantity) < 0){
                throw new AppError("This record not have this quantity", 401)
            }

            const newRecord = await prisma.record.update({
                where:{
                    id: record.id
                }, data:{
                    quantity : record.quantity + quantity
                }
            })

            const movement = await prisma.movement.create({
                data:{
                    recordId,
                    quantity
                }
            })

            return res.status(201).json({newRecord, movement})
        }
        catch (Error: any) {
            return res.status(Error.statusCode).json({ Error })
        }
    }
}