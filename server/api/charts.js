import express from 'express';
import { someChartController } from '../controllers/chartController'; // Your logic here

const app = express();

app.use(express.json());

app.get('/api/v1/charts', someChartController);

export default app;
