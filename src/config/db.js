import dns from 'node:dns';
import mongoose from 'mongoose';

const wait = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  const maxRetries = Number(process.env.MONGO_CONNECT_RETRIES || 5);
  const retryDelayMs = Number(process.env.MONGO_CONNECT_RETRY_DELAY_MS || 2000);
  const customDnsServers = process.env.MONGO_DNS_SERVERS;

  if (!mongoUri) {
    throw new Error('MONGO_URI is not set in environment variables.');
  }

  if (customDnsServers) {
    const servers = customDnsServers
      .split(',')
      .map((server) => server.trim())
      .filter(Boolean);

    if (servers.length > 0) {
      dns.setServers(servers);
      console.log(`Using custom DNS servers for MongoDB lookup: ${servers.join(', ')}`);
    }
  }

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    try {
      const conn = await mongoose.connect(mongoUri);

      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      const isDnsError = error?.code === 'ENOTFOUND' || error?.message?.includes('querySrv ENOTFOUND');

      if (isDnsError) {
        console.error('MongoDB DNS lookup failed for your Atlas cluster host.');
        console.error('Verify the cluster hostname in MONGO_URI and check your network/VPN DNS settings.');
      }

      console.error(`MongoDB Connection Error: ${error.message}`);

      if (attempt === maxRetries) {
        throw error;
      }

      // Retry only DNS and temporary network errors, fail fast for config/auth errors.
      if (!isDnsError && error?.name !== 'MongooseServerSelectionError') {
        throw error;
      }

      console.error(`Retrying MongoDB connection (${attempt}/${maxRetries}) in ${retryDelayMs}ms...`);
      await wait(retryDelayMs);
    }
  }
};

export default connectDB;