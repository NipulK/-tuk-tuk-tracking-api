import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
	addLocation,
	getLatestLocation,
	getLocationHistory
} from '../controllers/locationController.js';

const router = express.Router();

/**
 * @swagger
 * /api/location:
 *   post:
 *     summary: Add location data
 *     tags: [Location]
 */
router.post('/', addLocation);

/**
 * @swagger
 * /api/location/latest/{vehicleId}:
 *   get:
 *     summary: Get latest location
 *     tags: [Location]
 */
router.get('/latest/:vehicleId', protect, getLatestLocation);

/**
 * @swagger
 * /api/location/history/{vehicleId}:
 *   get:
 *     summary: Get location history
 *     tags: [Location]
 */
router.get('/history/:vehicleId', protect, getLocationHistory);

export default router;