import Vehicle from '../models/Vehicle.js';

// CREATE vehicle
export const createVehicle = async (req, res) => {
  try {
    const {
      registrationNumber,
      ownerName,
      ownerPhone,
      deviceId,
      province,
      district,
      policeStation,
      status
    } = req.body;

    const vehicleExists = await Vehicle.findOne({
      $or: [{ registrationNumber }, { deviceId }]
    });

    if (vehicleExists) {
      return res.status(400).json({
        message: 'Vehicle registration number or device ID already exists'
      });
    }

    const vehicle = await Vehicle.create({
      registrationNumber,
      ownerName,
      ownerPhone,
      deviceId,
      province,
      district,
      policeStation,
      status
    });

    res.status(201).json({
      message: 'Vehicle created successfully',
      vehicle
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all vehicles (with filtering)
export const getVehicles = async (req, res) => {
  try {
    const { province, district, policeStation, status } = req.query;

    const filter = {};

    if (province) filter.province = province;
    if (district) filter.district = district;
    if (policeStation) filter.policeStation = policeStation;
    if (status) filter.status = status;

    const vehicles = await Vehicle.find(filter)
      .populate('province', 'name')
      .populate('district', 'name')
      .populate('policeStation', 'name code')
      .sort({ createdAt: -1 });

    res.json(vehicles);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single vehicle
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
      .populate('province', 'name')
      .populate('district', 'name')
      .populate('policeStation', 'name code');

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json(vehicle);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE vehicle
export const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json({
      message: 'Vehicle updated successfully',
      vehicle
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE vehicle
export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json({ message: 'Vehicle deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};