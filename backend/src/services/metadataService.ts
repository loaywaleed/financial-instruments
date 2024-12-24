/* Desc: Metadata service for handling metadata routes */
import { connectToDatabase } from '../config/database';
import { ApiError } from '../utils/apiErrorHandler';

/**
 * Fetches metadata from the database.
 * @optional  symbol - The symbol of the financial instrument to fetch metadata for.
 * @returns A promise that resolves to the metadata of the financial instrument.
 * @throws {ApiError} If there is an error while fetching the data.
 */
export async function fetchMetadataService(symbol: string | null) {
  if (symbol) {
    return fetchMetadataBySymbolService(symbol);
  } else {
    return fetchAllMetadataService();
  }
}

/**
 * Fetches all metadata.
 * @returns A promise that resolves to the metadata of the financial instrument.
 * @throws {ApiError} If there is an error while fetching the data.
 */
export async function fetchAllMetadataService() {
  try {
    const db = await connectToDatabase();
    return db.collection('metadata').find({}).toArray();
  } catch (error) {
    throw new ApiError('Failed to fetch data', 400);
  }
}

/**
 * Fetches metadata for a given financial instrument symbol from the database.
 * @param {string} symbol - The symbol of the financial instrument to fetch metadata for.
 * @returns A promise that resolves to the metadata of the financial instrument.
 * @throws {ApiError} If there is an error while fetching the data.
 */
export async function fetchMetadataBySymbolService(symbol: string) {
  try {
    const db = await connectToDatabase();
    return db.collection('metadata').findOne({ symbol });
  } catch (error) {
    throw new ApiError('Failed to fetch data', 400);
  }
}
