/* Database connection module*/
import { MongoClient } from 'mongodb';
import { ApiError } from '../utils/apiErrorHandler';

let client: MongoClient | null = null;

/**
 * @summary - Connects to the database
 * @returns {Promise<MongoClient>} - Returns a promise that resolves to a MongoClient instance
 */
export const connectToDatabase = async () => {
  if (!client) {
    try {
      client = new MongoClient(process.env.MONGO_URI || 'mongodb://localhost:27017/mydb', {
        connectTimeoutMS: 5000,
        maxPoolSize: 50,
      });
      await client.connect();
    } catch (error) {
      if (client) {
        await client.close().catch(console.error);
        client = null;
      }
      throw new ApiError('Database connection failed', 500);
    }
  }
  return client.db('mydb');
};
