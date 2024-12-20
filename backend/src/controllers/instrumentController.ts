import {
  fetchAllInstrumentsService,
  fetchInstrumentBySymbolService,
  fetchInstrumentByTypeService,
} from '../services/instrumentService';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

/**
 * @route GET /api/instruments
 * @summary Get all instruments
 * @returns {200} - Retrieved all instruments successfully
 * @returns {404} - No instruments found
 */
export const getAllInstruments = asyncHandler(async (req: Request, res: Response) => {
  const type = req.query.type as string;
  let result;
  if (type) {
    result = await fetchInstrumentByTypeService(type);
  } else {
    result = await fetchAllInstrumentsService();
  }
  res.status(200).json(result);
});

/**
 * @route GET /api/instruments/:id
 * @summary Get instrument by symbol
 * @returns {200} - Retrieved instrument by symbol successfully
 * @returns {404} - Instrument not found
 */
export const getInstrumentBySymbol = asyncHandler(async (req: Request, res: Response) => {
  const result = await fetchInstrumentBySymbolService(req.params.id);
  res.status(200).json(result);
});
