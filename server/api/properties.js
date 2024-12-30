import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'https://poliboard-dashboard-client.vercel.app',  // Allow your frontend to access the backend
}));

app.get('/api/v1/properties', (req, res) => {
  res.json({ message: "Properties route" });
});

export default app;
