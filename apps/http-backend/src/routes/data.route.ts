import { Router } from "express";
import { middleware } from "../utils/middleware";

const router: Router = Router();

const { addShapes, getChats, getShapes } = require("../controllers/data.controller.js");

router.post('/shapes/:slug', middleware, addShapes);
router.get('/shapes/:slug', middleware, getShapes);
router.get('/chat/:slug', middleware, getChats);

export default router;