import mongoose from 'mongoose';

const policeStationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true,
      unique: true
    },
    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'District',
      required: true
    },
    province: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Province',
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('PoliceStation', policeStationSchema);