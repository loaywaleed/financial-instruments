/* Data service to insert and delete data from the database. */
import { connectToDatabase } from '../config/database';
import { ApiError } from '../utils/apiErrorHandler';

/**
 * Deletes all data from the database.
 *
 * @returns A promise that resolves to a success message.
 * @throws {ApiError} If there is an error deleting the data.
 */
export async function insertDataService(
  metadata_raw: any,
  exchange_raw: any,
  candle_raw: any,
  instrumentTypes: any
) {
  try {
    const db = await connectToDatabase();
    const metadata = metadata_raw.hits.hits.map((hit: any) => hit._source);
    const exchange = exchange_raw.hits.hits.map((hit: any) => hit._source);
    const candle = candle_raw.hits.hits.map((hit: any) => hit._source);
    const metadataCollection = db.collection('metadata');
    const exchangeCollection = db.collection('exchange');
    const candleCollection = db.collection('candle');
    const instrumentTypesCollection = db.collection('instrumentTypes');

    await instrumentTypesCollection.insertMany(
      Array.isArray(instrumentTypes) ? instrumentTypes : [instrumentTypes]
    );

    await metadataCollection.insertMany(Array.isArray(metadata) ? metadata : [metadata]);
    await exchangeCollection.insertMany(Array.isArray(exchange) ? exchange : [exchange]);
    await candleCollection.insertMany(Array.isArray(candle) ? candle : [candle]);
    return 'Data loaded successfully';
  } catch (error) {
    throw new ApiError('Failed to insert data', 400);
  }
}

/**
 * Delete data .
 *
 * @returns A promise that resolves to a deleted message.
 * @throws {ApiError} If there is an error deleting the data.
 */
export async function DeleteAllDataService() {
  try {
    const db = await connectToDatabase();
    db.collection('metadata').deleteMany({});
    db.collection('exchange').deleteMany({});
    db.collection('candle').deleteMany({});
    db.collection('instrumentTypes').deleteMany({});
    return 'Data deleted successfully';
  } catch (error) {
    throw new ApiError('Failed to delete data', 400);
  }
}
