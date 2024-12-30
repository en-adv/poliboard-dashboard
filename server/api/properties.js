import express from 'express';
import { somePropertiesController } from '../controllers/propertiesController'; // Your logic here

const app = express();

app.use(express.json());

app.get('/api/v1/properties', somePropertiesController);

export default app;
