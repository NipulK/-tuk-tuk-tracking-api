import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import testRoutes from './routes/testRoutes.js';
import masterDataRoutes from './routes/masterDataRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import locationRoutes from './routes/locationRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

// CORS middleware should be added before any route handlers to ensure that all routes are covered by CORS policies.
app.use('/api/test', testRoutes);
// Master data routes should be added before authentication routes to ensure that they are protected by CORS and logging middleware.
app.use('/api/master-data', masterDataRoutes);
// Vehicle routes should be added after authentication routes to ensure that they are protected by the authentication middleware.
app.use('/api/vehicles', vehicleRoutes);
// Location routes should be added after authentication routes to ensure that they are protected by the authentication middleware.
app.use('/api/location', locationRoutes);
// Logging middleware should be added after CORS to ensure that all requests are logged, including those that may be blocked by CORS.
app.use('/api/auth', authRoutes);
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).send('API is running...');
});


export default app;