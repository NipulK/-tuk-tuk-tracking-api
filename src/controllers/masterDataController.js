import Province from '../models/Province.js';
import District from '../models/District.js';
import PoliceStation from '../models/PoliceStation.js';

export const getProvinces = async (req, res) => {
  try {
    const provinces = await Province.find().sort({ name: 1 });
    res.status(200).json(provinces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDistricts = async (req, res) => {
  try {
    const { provinceId } = req.query;
    const filter = provinceId ? { province: provinceId } : {};
    const districts = await District.find(filter).sort({ name: 1 });
    res.status(200).json(districts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPoliceStations = async (req, res) => {
  try {
    const { provinceId, districtId } = req.query;
    const filter = {};

    if (provinceId) {
      filter.province = provinceId;
    }

    if (districtId) {
      filter.district = districtId;
    }

    const policeStations = await PoliceStation.find(filter).sort({ name: 1 });
    res.status(200).json(policeStations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};