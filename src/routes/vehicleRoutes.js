import express from 'express';
import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
} from '../controllers/vehicleController.js';

import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create vehicle (only admin)
router.post('/', protect, authorizeRoles('admin'), createVehicle);

// Get all vehicles (all logged users)
router.get('/', protect, getVehicles);


// Get single vehicle
router.get('/:id', protect, getVehicleById);

// Update vehicle (only admin)
router.put('/:id', protect, authorizeRoles('admin'), updateVehicle);

// Delete vehicle (only admin)
router.delete('/:id', protect, authorizeRoles('admin'), deleteVehicle);

export default router;