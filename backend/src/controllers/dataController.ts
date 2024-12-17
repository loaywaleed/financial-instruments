import { Request, Response } from 'express';
import {
  insertDataService,
  fetchMetadataService,
  fetchMetadataBySymbol,
  DeleteAllDataService,
} from '../services/dataService';
import metadata from '../data/metadata.json';
import exchange from '../data/exchange.json';
import candle from '../data/candle.json';
import instrumentTypes from '../data/instrumentTypes.json';
import asyncHandler from 'express-async-handler';

export const loadData = asyncHandler(async (_req: Request, res: Response) => {
  const result = await insertDataService(metadata, exchange, candle, instrumentTypes);
  res.status(201).json({ message: 'Data loaded successfully', result });
});

export const getmetaData = asyncHandler(async (_req: Request, res: Response) => {
  const result = await fetchMetadataService();
  res.status(200).json(result);
});

export const deleteData = asyncHandler(async (_req: Request, res: Response) => {
  await DeleteAllDataService();
  res.status(204).end();
});

export const getMetadataBySymbol = asyncHandler(async (req: Request, res: Response) => {
  const result = await fetchMetadataBySymbol(req.params.symbol);
  res.status(200).json(result);
});
