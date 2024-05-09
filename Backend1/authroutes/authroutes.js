import express from 'express';
import { signin, login, logout } from "../controllers/authcontrollers.js"

const router = express.Router();

router.post("/login",login);

router.post("/signup",signin);

router.post("/logout",logout);

export default router;