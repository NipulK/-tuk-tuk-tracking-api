import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Province from '../models/Province.js';
import District from '../models/District.js';
import PoliceStation from '../models/PoliceStation.js';

dotenv.config();
await connectDB();

const seedData = async () => {
  try {
    await Province.deleteMany();
    await District.deleteMany();
    await PoliceStation.deleteMany();

    const western = await Province.create({ name: 'Western Province' });
    const central = await Province.create({ name: 'Central Province' });
    const southern = await Province.create({ name: 'Southern Province' });
    const northern = await Province.create({ name: 'Northern Province' });
    const eastern = await Province.create({ name: 'Eastern Province' });
    const northWestern = await Province.create({ name: 'North Western Province' });
    const northCentral = await Province.create({ name: 'North Central Province' });
    const uva = await Province.create({ name: 'Uva Province' });
    const sabaragamuwa = await Province.create({ name: 'Sabaragamuwa Province' });

    const colombo = await District.create({ name: 'Colombo', province: western._id });
    const gampaha = await District.create({ name: 'Gampaha', province: western._id });
    const kalutara = await District.create({ name: 'Kalutara', province: western._id });

    const kandy = await District.create({ name: 'Kandy', province: central._id });
    const matale = await District.create({ name: 'Matale', province: central._id });
    const nuwaraEliya = await District.create({ name: 'Nuwara Eliya', province: central._id });

    const galle = await District.create({ name: 'Galle', province: southern._id });
    const matara = await District.create({ name: 'Matara', province: southern._id });
    const hambantota = await District.create({ name: 'Hambantota', province: southern._id });

    const jaffna = await District.create({ name: 'Jaffna', province: northern._id });
    const kilinochchi = await District.create({ name: 'Kilinochchi', province: northern._id });
    const mannar = await District.create({ name: 'Mannar', province: northern._id });
    const vavuniya = await District.create({ name: 'Vavuniya', province: northern._id });
    const mullaitivu = await District.create({ name: 'Mullaitivu', province: northern._id });

    const batticaloa = await District.create({ name: 'Batticaloa', province: eastern._id });
    const ampara = await District.create({ name: 'Ampara', province: eastern._id });
    const trincomalee = await District.create({ name: 'Trincomalee', province: eastern._id });

    const kurunegala = await District.create({ name: 'Kurunegala', province: northWestern._id });
    const puttalam = await District.create({ name: 'Puttalam', province: northWestern._id });

    const anuradhapura = await District.create({ name: 'Anuradhapura', province: northCentral._id });
    const polonnaruwa = await District.create({ name: 'Polonnaruwa', province: northCentral._id });

    const badulla = await District.create({ name: 'Badulla', province: uva._id });
    const monaragala = await District.create({ name: 'Monaragala', province: uva._id });

    const ratnapura = await District.create({ name: 'Ratnapura', province: sabaragamuwa._id });
    const kegalle = await District.create({ name: 'Kegalle', province: sabaragamuwa._id });

    await PoliceStation.insertMany([
      { name: 'Colombo Fort Police Station', code: 'PS001', province: western._id, district: colombo._id },
      { name: 'Bambalapitiya Police Station', code: 'PS002', province: western._id, district: colombo._id },
      { name: 'Pettah Police Station', code: 'PS003', province: western._id, district: colombo._id },
      { name: 'Negombo Police Station', code: 'PS004', province: western._id, district: gampaha._id },
      { name: 'Gampaha Police Station', code: 'PS005', province: western._id, district: gampaha._id },
      { name: 'Kalutara Police Station', code: 'PS006', province: western._id, district: kalutara._id },

      { name: 'Kandy Police Station', code: 'PS007', province: central._id, district: kandy._id },
      { name: 'Peradeniya Police Station', code: 'PS008', province: central._id, district: kandy._id },
      { name: 'Matale Police Station', code: 'PS009', province: central._id, district: matale._id },
      { name: 'Nuwara Eliya Police Station', code: 'PS010', province: central._id, district: nuwaraEliya._id },

      { name: 'Galle Police Station', code: 'PS011', province: southern._id, district: galle._id },
      { name: 'Matara Police Station', code: 'PS012', province: southern._id, district: matara._id },
      { name: 'Tangalle Police Station', code: 'PS013', province: southern._id, district: hambantota._id },

      { name: 'Jaffna Police Station', code: 'PS014', province: northern._id, district: jaffna._id },
      { name: 'Vavuniya Police Station', code: 'PS015', province: northern._id, district: vavuniya._id },

      { name: 'Batticaloa Police Station', code: 'PS016', province: eastern._id, district: batticaloa._id },
      { name: 'Ampara Police Station', code: 'PS017', province: eastern._id, district: ampara._id },
      { name: 'Trincomalee Police Station', code: 'PS018', province: eastern._id, district: trincomalee._id },

      { name: 'Kurunegala Police Station', code: 'PS019', province: northWestern._id, district: kurunegala._id },
      { name: 'Anuradhapura Police Station', code: 'PS020', province: northCentral._id, district: anuradhapura._id },
      { name: 'Badulla Police Station', code: 'PS021', province: uva._id, district: badulla._id },
      { name: 'Ratnapura Police Station', code: 'PS022', province: sabaragamuwa._id, district: ratnapura._id }
    ]);

    console.log('Seed data inserted successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();