import { MongoClient } from 'mongodb';
import { ApiError } from '../utils/apiErrorHandler';

let client: MongoClient;
export const connectToDatabase = async () => {
  if (!client) {
    try {
      client = new MongoClient(process.env.MONGO_URI || 'mongodb://localhost:27017');
      await client.connect();
    } catch (error) {
      console.error('Failed to connect to the database', error);
      throw new ApiError('Database connection failed', 500);
    }
  }
  return client.db('myDatabase');
};
