import { Request, Response } from "express";
import { formatDate } from "../utils/formatDate";

const { CreateRoomSchema } = require("@repo/common/types");
const prismaClient = require("@repo/db/client");


export async function addRoom(req: Request, res: Response){
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success){
        const errors = parsedData.error.errors.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message
        }));
        return res.status(400).json({
            errors
        });
    }

    //@ts-ignore
    const userId = req.userId;
    const { name, shapes } = parsedData.data;
    const slug = name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    try {
        await prismaClient.$transaction(async (tx: any) => {
            const room = await tx.room.create({
                data: {
                    slug,
                    name,
                    adminId: userId
                }
            });

            await tx.roomMembers.create({
                data: {
                    roomId: room.id,
                    userId: userId
                }
            });

            if (shapes && shapes.length > 0) {
                const shapeData = shapes.map((shape: string) => ({
                    slug,
                    shape
                }));
                await tx.shape.createMany({
                    data: shapeData
                });
            }
        });

        return res.status(200).json("Room created");

    } catch (error) {
        return res.status(411).json({
            field: 'name',
            message: "Room exists. Choose a different name.",
            error: error
        });
    }
}

export async function getAllRooms(req: Request, res: Response) {
    try {
        //@ts-ignore
        const userId = req.userId;
        const rooms = await prismaClient.roomMembers.findMany({
            where: {
                userId
            },
            include: {
                room: {
                    select: {
                        id: true,
                        slug: true,
                        name: true,
                        admin: {
                            select: {
                                id: true,
                                name: true
                            },
                        },
                        members: {
                            select: {
                                id: true
                            }
                        },
                        createdAt: true,
                        updatedAt: true
                    }
                }
            }
        });

        const result = rooms.map((member: any) => ({
            id: member.room.id,
            slug: member.room.slug,
            roomName: member.room.name,
            adminId: member.room.admin.id,
            adminName: member.room.admin.name,
            membersCount: member.room.members.length,
            createdAt: formatDate(member.room.createdAt),
            updatedAt: formatDate(member.room.updatedAt),
            isMember: member.room.members.map((m: any) => m.id).includes(userId)
        }))

        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function getRoomsOverview(req: Request, res: Response) {
    try {
        const rooms = await prismaClient.room.findMany({
            where: {
                slug: {
                    contains: req.params.slug
                },
            },
            select: {
                slug: true,
                name: true,
                admin: {
                    select: {
                        name: true
                    }
                },
                members: {
                    select: {
                        id: true
                    }
                },
                createdAt: true
            }
        });
        if(!rooms){
            return res.status(200);
        }

        const result = rooms.map((room: any) => ({
            slug: room.slug,
            roomName: room.name,
            adminName: room.admin.name,
            membersCount: room.members.length,
            createdAt: formatDate(room.createdAt),
        }));

        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function getRoomDetails(req: Request, res: Response){
    //@ts-ignore
    const userId = req.userId;
    const data = await prismaClient.roomMembers.findFirst({
        where: {
            userId, 
            room: {
                slug: req.params.slug
            }
        },
        include: {
            room: {
                select: {
                    slug: true,
                    name: true,
                    updatedAt: true,
                    admin: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    chat: {
                        select: {
                            id: true,
                            message: true,
                            userId: true,
                            user: {
                                name: true,
                                photo: true
                            },
                            createdAt: true
                        },
                        orderBy: {
                            id: "desc"
                        },
                        take: 1000
                    }, 
                    shape: {
                        select: {
                            shape: true
                        }
                    }
                }
            }
        }
    });

    const chats = data.room.chat.map((chat: any) => ({
        id: chat.id,
        message: chat.message,
        senderId: chat.userId,
        senderName: chat.user.name,
        senderPhoto: chat.user.photo,
        sentDate: formatDate(chat.createdAt)
    }));

    res.status(200).json({
        slug: data.room.slug,
        name: data.room.name,
        updatedAt: data.room.updatedAt,
        adminId: data.room.admin.id,
        adminName: data.room.admin.name,
        messages: chats,
        shapes: data.room.shapes
    });
}

export async function deleteRoom(req: Request, res: Response){
    try {
        //@ts-ignore
        const userId = req.userId
        await prismaClient.room.delete({
            where: {
                slug: req.params.slug,
                adminId: userId
            }
        });
        return res.status(200).json("Room deleted");
    } catch (error) {
        return res.status(400).json(error);
    }
}