import express from 'express';
import { getMetrics } from '../controllers/metric.controller.js';



const router = express.Router();

router.get('/', getMetrics);

export default router;