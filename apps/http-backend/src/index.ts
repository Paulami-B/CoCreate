import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route";
import roomRouter from "./routes/room.route";
import dataRouter from "./routes/data.route";

const app = express();
app.use(express.json());
app.use(cors());

app.use(authRouter);
app.use(roomRouter);
app.use(dataRouter);

app.listen(3001, () => {
    console.log("Listening at PORT 3000 🎧");
});