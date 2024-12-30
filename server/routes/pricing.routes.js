import express from 'express';
import { updateBillboardPrices } from '../controllers/pricing.controller.js';

const router = express.Router();

router.post('/update-prices', async (req, res) => {
    try {
      // Call the controller method to calculate and update metrics
      await updateBillboardPrices(req, res);
    } catch (error) {
      console.error("--------error update price", error);
      res.status(500).json({ message: '--------error update price' });
    }
  });
export default router;
