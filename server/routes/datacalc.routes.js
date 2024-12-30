import express from 'express';
import { calculateAndUpdateMetrics } from '../controllers/datacalc.controller.js';

const router = express.Router();

// Define the POST endpoint for metrics calculation
router.post('/update-metrics', async (req, res) => {
  try {
    // Call the controller method to calculate and update metrics
    await calculateAndUpdateMetrics(req, res);
  } catch (error) {
    console.error("Error in update-metrics route:", error);
    res.status(500).json({ message: 'Failed to update metrics' });
  }
});

export default router;
