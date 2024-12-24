/* Candles Service */
import { connectToDatabase } from '../config/database';
import { ApiError } from '../utils/apiErrorHandler';

/**
 * Fetches candle data from the database.
 *
 * @optional symbol - The symbol for which to fetch candle data.
 * @returns A promise that resolves to an array of candle data objects.
 * @throws {ApiError} If there is an error fetching the data.
 */
export async function fetchCandlesService(symbol: string | null) {
  if (symbol) {
    return getCandleBySymbolService(symbol);
  } else {
    return getAllCandlesService();
  }
}

/**
 * Fetches candle data for a given symbol from the database.
 *
 * @returns A promise that resolves to an array of candle data objects.
 * @throws {ApiError} If there is an error fetching the data.
 */
export async function getAllCandlesService() {
  try {
    const db = await connectToDatabase();
    return db.collection('candle').find({}).toArray();
  } catch (error) {
    throw new ApiError('Failed to fetch data', 400);
  }
}

/**
 * Fetches candle data for a given symbol from the database.
 *
 * @param symbol - The symbol for which to fetch candle data.
 * @returns A promise that resolves to an array of candle data objects by symbol.
 * @throws {ApiError} If there is an error fetching the data.
 */
export async function getCandleBySymbolService(symbol: string) {
  try {
    const db = await connectToDatabase();
    return db.collection('candle').find({ symbol }).toArray();
  } catch (error) {
    throw new ApiError('Failed to fetch data', 400);
  }
}
