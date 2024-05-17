import log from '@utils/logger';
import mongoose from 'mongoose';

async function connectToMongo() {
  const dbUri = process.env.dbUri || 'mongodb://root:password@localhost:27017/';
  try {
    await mongoose.connect(dbUri);
    log.info('mongoose db connected ');
  } catch (error) {
    log.error(error);
    process.exit(1);
  }
}

export default connectToMongo;
