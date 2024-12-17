import asyncHandler from 'express-async-handler';
import { fetchAllInstrumentTypesService } from '../services/instrumentService';

export const getAllInstrumentTypes = asyncHandler(async (_req, res) => {
  const result = await fetchAllInstrumentTypesService();
  res.status(200).json(result);
});

export async function getInstrumentTypeById() {
  return;
}
