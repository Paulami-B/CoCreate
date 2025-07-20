import { Router } from "express";

const { signin, signup } = require("../controllers/auth.controller.js");

const router: Router = Router();

router.post('/signup', signup);
router.post('/signin', signin);

export default router;