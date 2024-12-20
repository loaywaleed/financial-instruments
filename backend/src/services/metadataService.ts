import { connectToDatabase } from '../config/database';
import { ApiError } from '../utils/apiErrorHandler';

export async function fetchMetadataService(symbol: string | null) {
  if (symbol) {
    return fetchMetadataBySymbolService(symbol);
  } else {
    return fetchAllMetadataService();
  }
}

export async function fetchAllMetadataService() {
  try {
    const db = await connectToDatabase();
    return db.collection('metadata').find({}).toArray();
  } catch (error) {
    throw new ApiError('Failed to fetch data', 400);
  }
}

export async function fetchMetadataBySymbolService(symbol: string) {
  try {
    const db = await connectToDatabase();
    return db.collection('metadata').findOne({ symbol });
  } catch (error) {
    throw new ApiError('Failed to fetch data', 400);
  }
}
