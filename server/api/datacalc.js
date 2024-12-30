import express from 'express';
import { someDatacalcController } from '../controllers/datacalcController'; // Your logic here

const app = express();

app.use(express.json());

app.get('/api/v1/datacalc', someDatacalcController);

export default app;
