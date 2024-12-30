import express from 'express';
import Chart from '../mongodb/models/chart.js';

const router = express.Router();

// Fetch all chart data
router.get('/', async (req, res) => {
  try {
    const charts = await Chart.find();
    res.status(200).json(charts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new chart data
router.post('/', async (req, res) => {
  try {
    const { parameter, data } = req.body;

    // Ensure that data is an array with valid date-value pairs
    if (!Array.isArray(data) || data.some(item => !item.date || typeof item.value !== 'number')) {
      return res.status(400).json({ error: 'Invalid data format. Each data entry must have a valid date and numeric value.' });
    }

    const newChart = new Chart({
      parameter,
      data, // directly use the data array from the request body
    });

    await newChart.save();
    res.status(201).json(newChart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update existing chart data (Optional)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;

    // Ensure that data is an array with valid date-value pairs
    if (!Array.isArray(data) || data.some(item => !item.date || typeof item.value !== 'number')) {
      return res.status(400).json({ error: 'Invalid data format. Each data entry must have a valid date and numeric value.' });
    }

    const updatedChart = await Chart.findByIdAndUpdate(
      id,
      { $push: { data: { $each: data } } }, // Add new data entries
      { new: true }
    );

    if (!updatedChart) {
      return res.status(404).json({ error: 'Chart not found' });
    }

    res.status(200).json(updatedChart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
