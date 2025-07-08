import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import bcrypt from "bcryptjs";
import cors from "cors";

const prismaClient = require("@repo/db/client");
const JWT_SECRET = require("@repo/backend-common/config");
const { CreateRoomSchema, CreateUserSchema, SignInSchema } = require("@repo/common/types");
const app = express();
app.use(express.json());
app.use(cors());

//@ts-ignore
app.post('/signup', async(req: Request, res: Response) => {

    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        const errors = parsedData.error.errors.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message
        }));
        return res.status(400).json({
            errors
        });
    }
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(parsedData.data.password, salt);  
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data?.email,
                password: hashedPassword,
                name: parsedData.data.name,
                photo: "https://psdwpigrwviemeuedtfq.supabase.co/storage/v1/object/public/images//profile-image.png"
            }
        });

        res.json({
            userId: user.id
        });
    } catch (error :any) {
        if(error?.meta?.target && Array.isArray(error.meta.target) && error.meta.target[0] === "email"){
            return res.status(409).json({
                field: "email",
                message: "Email already exists"
            });
        }
        res.status(411).json(error);
    }

});

//@ts-ignore
app.post('/signin', async(req: Request, res: Response) => {

    const parsedData = SignInSchema.safeParse(req.body);
    if(!parsedData.success){
        const errors = parsedData.error.errors.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message
        }));
        return res.json({
            errors
        });
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
        }
    })

    if (!user) {
        res.status(404).json({
            message: "User ID does not exist"
        })
        return;
    }

    if(!bcrypt.compareSync(parsedData.data.password, user.password)){
        return res.status(403).json({
            message: "Incorrect password"
        });
    }

    const token = jwt.sign({
        userId: user.id
    }, JWT_SECRET);

    res.json({
        token
    });

});

//@ts-ignore
app.post('/room', middleware, async(req: Request, res: Response) => {

    const parsedData = CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success){
        const errors = parsedData.error.errors.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message
        }));
        return res.json({
            errors
        });
    }

    //@ts-ignore
    const userId = req.userId;
    const slug = parsedData.data.name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    try {
        const room = await prismaClient.room.create({
            data: {
                slug: slug,
                name: parsedData.data.name,
                adminId: userId
            }
        });

        return res.json({
            roomId: room.id
        });

    } catch (error) {
        return res.status(411).json({
            message: "Room already exists with this name"
        });
    }
});

app.get("/chats/:roomId", middleware, async(req: Request, res: Response) => {
    try {
        const roomId = Number(req.params.roomId);
        console.log(req.params.roomId);
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 1000
        });

        res.json({
            messages
        });
    } catch(e) {
        console.log(e);
        res.json({
            messages: []
        });
    }
});


app.get("/room/:slug", async(req: Request, res: Response) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug
        }
    });

    res.json({
        room
    })
});

app.listen(3001);