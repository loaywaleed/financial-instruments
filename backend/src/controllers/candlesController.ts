import { getCandleBySymbolService, fetchCandlesService } from '../services/candlesService';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

/**
 * Get exchange candles
 * @route GET /api/candles/:symbol/:exchange/:interval
 * @summary Get exchange candles
 * @returns {object} 200 - Retrieved exchange candles successfully
 */
export const getCandles = asyncHandler(async (req: Request, res: Response) => {
  const result = await fetchCandlesService(req.query.symbol as string);
  res.status(200).json(result);
});
