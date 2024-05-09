import express from 'express';
import { getuserforsidebar } from '../controllers/getuserforsidebar.js';
import protectRoute from '../middleware/Protectroute.js';

const router = express.Router();

router.get('/', protectRoute,getuserforsidebar);

export default router