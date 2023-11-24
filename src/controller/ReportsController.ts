import { Request, Response } from "express";
import { prisma } from "../database/client";
import { endOfMonth, getYear, lastDayOfMonth, startOfMonth } from 'date-fns'


export class ReportsController {
    async recentMoves(req: Request, res: Response) {
        const { fromDate, toDate } = req.body;


        try {


            const moves = await prisma.movement.findMany({
                where: {
                    createdAt: {
                        gte: `${fromDate}T00:00:00.000Z`,
                        lte: `${toDate}T23:59:59.999Z`
                    }
                },
                select: {
                    quantity: true,
                    createdAt: true,
                    Record: {
                        select: {
                            batch: true,
                            expires: true,
                            Material: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    },
                    User: {
                        select: {
                            userName: true
                        }
                    }

                }
            })
            console.log(moves)
            return res.json({ moves })
        } catch (Error) {
            console.log(Error)
            return res.json(Error)
        }
    }

    async mounthExpends(req: Request, res: Response) {
        const { date } = req.body;

        const fromDate = startOfMonth(new Date(date))
        const toDate = lastDayOfMonth(new Date(date))

        console.log(fromDate, toDate)

        const expends = await prisma.movement.groupBy({
            by: ['recordId'],
            where: {
                createdAt: {
                    lte: toDate,
                    gte: fromDate
                },
                quantity:{
                    lt: 0
                }

            },
            _sum: {
                quantity: true
            },

        })

        const records = await prisma.record.findMany({
            where:{
                updatedAt: {
                    lte: toDate,
                    gte: fromDate
                }
   
            },
            select: {
                id:true ,

                Material:{
                    select:{
                        name: true,
                    }
                },
            }
        })

        const recordsWithExpends = records.map((record: { id: any; }) => {
            const expendRecords = expends.filter((expend: { recordId: any; }) => expend.recordId === record.id);
            //const expendRecords = expends.filter((expend: { recordId: any; }) => expend.crea expend.recordId === record.id);

            return {
                ...record,
                expends: expendRecords,                
            }
        })

        const registro = recordsWithExpends.filter(records => records.expends.length > 0)

        return res.json({registro})
    }
}