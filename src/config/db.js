import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('MONGO_URI is not set in environment variables.');
  }

  try {
    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    if (error?.code === 'ENOTFOUND' || error?.message?.includes('querySrv ENOTFOUND')) {
      console.error('MongoDB DNS lookup failed for your Atlas cluster host.');
      console.error('Verify the cluster hostname in MONGO_URI and check your network/VPN DNS settings.');
    }
    console.error(`MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

export default connectDB;