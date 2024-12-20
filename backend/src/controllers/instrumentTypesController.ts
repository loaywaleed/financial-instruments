import asyncHandler from 'express-async-handler';
import { fetchAllInstrumentTypesService } from '../services/instrumentService';

/**
 * Get all instrument types
 * @route GET /api/instrumentTypes
 * @summary Get all instrument types
 * @returns 200 - Retrieved all instrument types successfully
 */
export const getAllInstrumentTypes = asyncHandler(async (_req, res) => {
  const result = await fetchAllInstrumentTypesService();
  res.status(200).json(result);
});
