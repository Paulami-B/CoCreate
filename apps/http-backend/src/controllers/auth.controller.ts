import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { CreateUserSchema, SignInSchema } = require("@repo/common/types");
const prismaClient = require("@repo/db/client");
const JWT_SECRET = require("@repo/backend-common/config");


export async function signup(req: Request, res: Response){
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
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(parsedData.data.password, salt);  
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data?.email,
                password: hashedPassword,
                name: parsedData.data.name,
                photo: "https://psdwpigrwviemeuedtfq.supabase.co/storage/v1/object/public/images//profile-image.png"
            }
        });

        const token = jwt.sign({
            userId: user.id
        }, JWT_SECRET);

        res.status(200).json({
            token, 
            id: user.id,
            name: user.name,
            photo: user.photo
        });
    } catch (error :any) {
        if(error?.meta?.target && Array.isArray(error.meta.target) && error.meta.target[0] === "email"){
            return res.status(409).json({
                field: "email",
                message: "Email already exists"
            });
        }
        return res.status(411).json(error);
    }
}

export async function signin(req: Request, res: Response){
    const parsedData = SignInSchema.safeParse(req.body);
    if(!parsedData.success){
        const errors = parsedData.error.errors.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message
        }));
        return res.status(400).json({
            errors
        });
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.email,
        }
    })

    if (!user) {
        res.status(404).json({
            field: "email",
            message: "Email ID does not exist"
        })
        return;
    }

    if(!bcrypt.compareSync(parsedData.data.password, user.password)){
        return res.status(403).json({
            field: "password",
            message: "Incorrect password"
        });
    }

    const token = jwt.sign({
        userId: user.id
    }, JWT_SECRET);

    res.status(200).json({
        token,
        id: user.id,
        name: user.name,
        photo: user.photo
    });
}