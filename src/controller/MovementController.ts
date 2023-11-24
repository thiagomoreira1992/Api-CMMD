import { Request, Response } from "express";
import { prisma } from "../database/client";
import AppError from "../utils/AppError";



export class MovementController {
    async listAll(req: Request, response: Response) {
        const movements = await prisma.movement.findMany();

        return response.status(202).json({movements})
                    
    }

    async create(req: Request, res: Response) {
        const { batch, quantity } = req.body;
        const userId = req.user?.id;

        try {

            // Validar a entrada 'batch'
            if (typeof batch !== 'string' || batch.trim() === '') {
                throw new AppError('Batch deve ser uma string não vazia', 400);
            }

            // Validar a entrada 'quantity'
            if (typeof quantity !== 'number' || isNaN(quantity)) {
                throw new AppError('Quantity deve ser um número', 400);
            }

            if(typeof userId !== 'number'|| isNaN(userId)|| userId <= 0){
                throw new AppError('User has been logged', 400)
            }

            const record = await prisma.record.findUnique({
                where: {
                    batch
                }
            })

            if (!record) {
                throw new AppError("This Record not exists", 401)
            }

            if ((record.quantity + quantity) < 0) {
                throw new AppError("This record not have this quantity", 401)
            }

            const newRecord = await prisma.record.update({
                where: {
                    id: record.id
                }, data: {
                    quantity: record.quantity + quantity
                }
            })

            const movement = await prisma.movement.create({
                data: {
                    recordId: record.id,
                    quantity,
                    userId
                }
            })

            return res.status(201).json({ newRecord, movement })
        }
        catch (error) {
            if(error instanceof AppError){
                return res.status(error.statusCode).json({ error})
            }else{
                return res.json({ error : "Erro interno"})
            }
        }
    }
}