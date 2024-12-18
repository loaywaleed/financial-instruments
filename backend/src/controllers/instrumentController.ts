import {
  fetchAllInstrumentsService,
  fetchInstrumentBySymbolService,
  fetchInstrumentByTypeService,
} from '../services/instrumentService';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

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

export const getInstrumentBySymbol = asyncHandler(async (req: Request, res: Response) => {
  const result = await fetchInstrumentBySymbolService(req.params.id);
  res.status(200).json(result);
});
