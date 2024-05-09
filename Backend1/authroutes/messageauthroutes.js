import express from 'express';
import { getmessages, sendmessage } from '../controllers/messagecontroller.js';
import protectRoute from '../middleware/Protectroute.js';

const router = express.Router();

router.get("/:id",protectRoute,getmessages)
router.post("/send/:id",protectRoute,sendmessage)


export default router;