import express from 'express';
import {
  getProvinces,
  getDistricts,
  getPoliceStations
} from '../controllers/masterDataController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/provinces', protect, getProvinces);
router.get('/districts', protect, getDistricts);
router.get('/police-stations', protect, getPoliceStations);

export default router;