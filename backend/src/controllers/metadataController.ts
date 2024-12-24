/* Desc: Metadata Controller for managing metadata*/
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { fetchMetadataService } from '../services/metadataService';

/**
 * Get exchange candles
 * @route GET /api/candles/:symbol/:exchange/:interval
 * @summary Get exchange candles
 * @returns 200 - Retrieved exchange candles successfully
 */
export const getMetadata = asyncHandler(async (req: Request, res: Response) => {
  const result = await fetchMetadataService(req.query.symbol as string);
  res.status(200).json(result);
});
