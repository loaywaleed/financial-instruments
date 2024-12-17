import { MongoClient } from 'mongodb';

let client: MongoClient;
export const connectToDatabase = async () => {
  if (!client) {
    try {
      client = new MongoClient(process.env.MONGO_URI || 'mongodb://localhost:27017');
      await client.connect();
    } catch (error) {
      console.error('Failed to connect to the database', error);
      throw new Error('Database connection failed');
    }
  }
  return client.db('myDatabase');
};
