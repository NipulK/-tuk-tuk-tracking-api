import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Vehicle from '../models/Vehicle.js';
import Province from '../models/Province.js';
import District from '../models/District.js';
import PoliceStation from '../models/PoliceStation.js';
import LocationLog from '../models/LocationLog.js';

dotenv.config();
await connectDB();

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateData = async () => {
  try {
    console.log('Clearing old data...');
    await Vehicle.deleteMany();
    await LocationLog.deleteMany();

    const provinces = await Province.find();
    const districts = await District.find();
    const stations = await PoliceStation.find();

    console.log('Creating vehicles...');

    const vehicles = [];

    for (let i = 0; i < 200; i++) {
      const province = randomItem(provinces);
      const district = randomItem(districts);
      const station = randomItem(stations);

      const vehicle = await Vehicle.create({
        registrationNumber: `WP-${1000 + i}`,
        ownerName: `Owner ${i}`,
        ownerPhone: `07${Math.floor(10000000 + Math.random() * 90000000)}`,
        deviceId: `DEVICE-${i}`,
        province: province._id,
        district: district._id,
        policeStation: station._id,
        status: 'active'
      });

      vehicles.push(vehicle);
    }

    console.log('Generating location logs...');

    for (const vehicle of vehicles) {
      for (let day = 0; day < 7; day++) {
        for (let j = 0; j < 10; j++) {
          await LocationLog.create({
            vehicle: vehicle._id,
            deviceId: vehicle.deviceId,
            latitude: 6.9 + Math.random() * 0.2,
            longitude: 79.8 + Math.random() * 0.2,
            speed: Math.floor(Math.random() * 60),
            heading: Math.floor(Math.random() * 360),
            recordedAt: new Date(Date.now() - day * 24 * 60 * 60 * 1000)
          });
        }
      }
    }

    console.log('Simulation data created successfully ✅');
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

generateData();