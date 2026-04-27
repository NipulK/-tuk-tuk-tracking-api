import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      required: true,
      unique: true
    },
    ownerName: {
      type: String,
      required: true
    },
    ownerPhone: {
      type: String,
      required: true
    },
    deviceId: {
      type: String,
      required: true,
      unique: true
    },
    province: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Province',
      required: true
    },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'District',
      required: true
    },
    policeStation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PoliceStation',
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'flagged'],
      default: 'active'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Vehicle', vehicleSchema);