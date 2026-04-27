import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());
// Logging middleware should be added after CORS to ensure that all requests are logged, including those that may be blocked by CORS.
app.use('/api/auth', authRoutes);
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).send('API is running...');
});

export default app;