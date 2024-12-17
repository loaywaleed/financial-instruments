import { connectToDatabase } from '../config/database';
import { ApiError } from '../utils/apiErrorHandler';

export async function fetchAllInstrumentTypesService() {
  try {
    const db = await connectToDatabase();
    return db.collection('instrumentTypes').find({}).toArray();
  } catch (error) {
    throw new ApiError('Failed to fetch data', 400);
  }
}

export async function fetchAllInstrumentsService() {
  try {
    const db = await connectToDatabase();
    return db.collection('exchange').find({}).toArray();
  } catch (error) {
    throw new ApiError('Failed to fetch data', 400);
  }
}

export async function fetchInstrumentBySymbolService(id: string) {
  try {
    const db = await connectToDatabase();
    return db.collection('instruments').findOne({ id });
  } catch (error) {
    throw new ApiError('Failed to fetch data', 400);
  }
}

export async function fetchInstrumentByTypeService(type: string) {
  try {
    const db = await connectToDatabase();
    return db.collection('exchange').find({ type }).toArray();
  } catch (error) {
    throw new ApiError('Failed to fetch data', 400);
  }
}
