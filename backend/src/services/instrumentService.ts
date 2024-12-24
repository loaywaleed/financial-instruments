/* Instrument service module that provides functions for fetching financial instruments from the database. */
import { connectToDatabase } from '../config/database';
import { ApiError } from '../utils/apiErrorHandler';

/**
 * Fetches financial instruments types from the database.
 *
 * @returns  All instrument types
 * @throws {ApiError} Throws an error if the data fetching fails.
 */
export async function fetchAllInstrumentTypesService() {
  try {
    const db = await connectToDatabase();
    return db.collection('instrumentTypes').find({}).toArray();
  } catch (error) {
    throw new ApiError('Failed to fetch data', 400);
  }
}

/**
 * Fetches financial instruments .
 *
 * @returns  A promise that resolves to an array of financial instruments.
 * @throws {ApiError} Throws an error if the data fetching fails.
 */
export async function fetchAllInstrumentsService() {
  try {
    const db = await connectToDatabase();
    return db.collection('exchange').find({}).toArray();
  } catch (error) {
    throw new ApiError('Failed to fetch data', 400);
  }
}

/**
 * Fetches a financial instrument from the database based on the provided id.
 *
 * @param {string} id - The id of the financial instrument to fetch.
 * @returns A promise that resolves to a financial instrument.
 * @throws {ApiError} Throws an error if the data fetching fails.
 */
export async function fetchInstrumentBySymbolService(id: string) {
  try {
    const db = await connectToDatabase();
    return db.collection('instruments').findOne({ id });
  } catch (error) {
    throw new ApiError('Failed to fetch data', 400);
  }
}

/**
 * Fetches financial instruments from the database based on the provided type.
 *
 * @param {string} type - The type of financial instrument to fetch.
 * @returns  A promise that resolves to an array of financial instruments.
 * @throws {ApiError} Throws an error if the data fetching fails.
 */
export async function fetchInstrumentByTypeService(type: string) {
  try {
    const db = await connectToDatabase();
    return db.collection('exchange').find({ type }).toArray();
  } catch (error) {
    throw new ApiError('Failed to fetch data', 400);
  }
}
