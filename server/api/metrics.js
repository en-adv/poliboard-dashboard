import express from 'express';
import { someMetricController } from '../controllers/metricController'; // Your logic here

const app = express();

app.use(express.json());

app.get('/api/v1/metrics', someMetricController);

export default app;
