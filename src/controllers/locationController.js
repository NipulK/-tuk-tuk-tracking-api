import LocationLog from '../models/LocationLog.js';
import Vehicle from '../models/Vehicle.js';

// Add location
export const addLocation = async (req, res) => {
  try {
    const { deviceId, latitude, longitude, speed, heading } = req.body;

    const vehicle = await Vehicle.findOne({ deviceId });

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found for this device' });
    }

    const location = await LocationLog.create({
      vehicle: vehicle._id,
      deviceId,
      latitude,
      longitude,
      speed,
      heading
    });

    res.status(201).json({
      message: 'Location added',
      location
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get latest location
export const getLatestLocation = async (req, res) => {
  try {
    const location = await LocationLog.findOne({
      vehicle: req.params.vehicleId
    }).sort({ recordedAt: -1 });

    if (!location) {
      return res.status(404).json({ message: 'No location found' });
    }

    res.json(location);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get history
export const getLocationHistory = async (req, res) => {
  try {
    const { from, to } = req.query;

    const filter = {
      vehicle: req.params.vehicleId
    };

    if (from && to) {
      filter.recordedAt = {
        $gte: new Date(from),
        $lte: new Date(to)
      };
    }

    const locations = await LocationLog.find(filter).sort({ recordedAt: -1 });

    res.json(locations);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};