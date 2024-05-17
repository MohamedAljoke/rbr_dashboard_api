import log from '@utils/logger';
import mongoose from 'mongoose';

const delay = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

async function connectToMongo() {
  const dbUri = process.env.dbUri || 'mongodb://root:password@localhost:27017/';
  const maxRetries = 5;
  const retryDelay = 5000; // 5 seconds

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await mongoose.connect(dbUri);
      log.info('Mongoose DB connected');
      return;
    } catch (error) {
      log.error(`Attempt ${attempt} to connect to MongoDB failed. Error: ${error.message}`);
      if (attempt < maxRetries) {
        log.info(`Retrying in ${retryDelay / 1000} seconds...`);
        await delay(retryDelay);
      } else {
        log.error('Maximum retry attempts reached. Exiting...');
        process.exit(1);
      }
    }
  }
}
export default connectToMongo;
