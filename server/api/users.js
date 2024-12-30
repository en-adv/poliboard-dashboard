import express from 'express';
import { someUserController } from '../controllers/userController'; // Your logic here

const app = express();

app.use(express.json());

app.get('/api/v1/users', someUserController);

export default app;
