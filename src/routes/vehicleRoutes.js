import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import {
	createVehicle,
	getVehicles,
	getVehicleById,
	updateVehicle,
	deleteVehicle
} from '../controllers/vehicleController.js';

const router = express.Router();

/**
 * @swagger
 * /api/vehicles:
 *   post:
 *     summary: Create vehicle
 *     tags: [Vehicle]
 */
router.post('/', protect, authorizeRoles('admin'), createVehicle);

/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicle]
 */
router.get('/', protect, getVehicles);

/**
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     summary: Get vehicle by ID
 *     tags: [Vehicle]
 */
router.get('/:id', protect, getVehicleById);

/**
 * @swagger
 * /api/vehicles/{id}:
 *   put:
 *     summary: Update vehicle
 *     tags: [Vehicle]
 */
router.put('/:id', protect, authorizeRoles('admin'), updateVehicle);

/**
 * @swagger
 * /api/vehicles/{id}:
 *   delete:
 *     summary: Delete vehicle
 *     tags: [Vehicle]
 */
router.delete('/:id', protect, authorizeRoles('admin'), deleteVehicle);

export default router;