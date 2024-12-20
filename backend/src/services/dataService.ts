import { connectToDatabase } from '../config/database';
import { ApiError } from '../utils/apiErrorHandler';

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

export async function fetchExchangeService() {
  try {
    const db = await connectToDatabase();
    return db.collection('exchange').find({}).toArray();
  } catch (error) {
    throw new ApiError('Failed to fetch data', 400);
  }
}

export async function fetchCandleService() {
  try {
    const db = await connectToDatabase();
    return db.collection('candle').find({}).toArray();
  } catch (error) {
    throw new ApiError('Failed to fetch data', 400);
  }
}

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

export async function fetchMetadataBySymbol(symbol: string) {
  try {
    const db = await connectToDatabase();
    const result = db.collection('data').findOne({ symbol });
    if (!result) {
      throw new ApiError('Data not found', 404);
    }
    return result;
  } catch (error) {
    throw new ApiError('Failed to fetch data', 400);
  }
}
