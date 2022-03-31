import config from 'config';
import mongoose from 'mongoose';

export default async function connectDatabase() {
  // get db uri from config file
  const dbUri = config.get('dbUri') as string;

  try {
    // try to connect mongoose db
    const conn = await mongoose.connect(dbUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
}
