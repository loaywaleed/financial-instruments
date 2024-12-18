import { connectToDatabase } from '../config/database';
import { ApiError } from '../utils/apiErrorHandler';

export async function fetchCandlesService(symbol: string | null) {
  if (symbol) {
    return getCandleBySymbolService(symbol);
  } else {
    return getAllCandlesService();
  }
}

export async function getAllCandlesService() {
  try {
    const db = await connectToDatabase();
    return db.collection('candle').find({}).toArray();
  } catch (error) {
    throw new ApiError('Failed to fetch data', 400);
  }
}

export async function getCandleBySymbolService(symbol: string) {
  try {
    const db = await connectToDatabase();
    return db.collection('candle').find({ symbol }).toArray();
  } catch (error) {
    throw new ApiError('Failed to fetch data', 400);
  }
}
