import { Router } from "express";
import { middleware } from "../utils/middleware";

const { addRoom, getAllRooms, getRoomsOverview, getRoomDetails, deleteRoom } = require("../controllers/room.controller.js")

const router: Router = Router();

router.post('/addRoom', middleware, addRoom);
router.get('/rooms', middleware, getAllRooms);
router.get('/rooms/:slug/overview', middleware, getRoomsOverview);
router.get('/room/:slug/details', middleware, getRoomDetails);
router.delete('/room/:slug', middleware, deleteRoom);

export default router;