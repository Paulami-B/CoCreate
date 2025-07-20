import { Request, Response } from "express";

const prismaClient = require("@repo/db/client");

export async function addShapes(req: Request, res: Response){
    try {
        const slug = req.params.slug;
        const shapes = req.body.shapes;

        await prismaClient.$transaction([
            prismaClient.shape.create({
                data: {
                    slug,
                    shapes
                }
            }),

            prismaClient.room.update({
                where: {
                    slug
                }, 
                data: {
                    updatedAt: new Date()
                }
            })
        ]);

        return res.status(200).json("Shapes saved");

    } catch (error) {
        return res.status(411).json({
            message: "Error while saving shapes"
        });
    }
}

export async function getShapes(req: Request, res: Response) {
    try {
        const shapes = await prismaClient.shape.findMany({
            where: {
                slug: req.params.slug
            }
        });

        return res.status(200).json(shapes);
    } catch (error) {
        return res.status(411).json({
            message: "Error while getting shapes"
        });
    }
}

export async function getChats(req: Request, res: Response){
    try {
        const slug = Number(req.params.slug);
        const messages = await prismaClient.chat.findMany({
            where: {
                slug
            },
            orderBy: {
                id: "desc"
            },
            take: 1000
        });

        res.status(200).json({
            messages
        });
    } catch(e) {
        console.log(e);
        res.status(400).json({
            messages: []
        });
    }
}