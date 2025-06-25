import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateRoomSchema, CreateUserSchema, SignInSchema } from "@repo/common/types";

const app = express();

app.post('/signup', (req, res) => {

    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success){
        return res.json({
            message: "Incorrect inputs"
        })
    }

});

app.post('/signin', (req, res) => {

    const data = SignInSchema.safeParse(req.body);
    if(!data.success){
        return res.json({
            message: "Incorrect inputs"
        })
    }

    const userId = 1;
    jwt.sign({
        userId
    }, JWT_SECRET);

});

app.post('/room', middleware, async(req, res) => {

    const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success){
        return res.json({
            message: "Incorrect inputs"
        })
    }

    res.json({
        roomId: 1234
    });
});

app.listen(3000);