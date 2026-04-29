import express from 'express';
import {
  addLocation,
  getLatestLocation,
  getLocationHistory
} from '../controllers/locationController.js';

import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', addLocation); // device sends data
router.get('/latest/:vehicleId', protect, getLatestLocation);
router.get('/history/:vehicleId', protect, getLocationHistory);

export default router;