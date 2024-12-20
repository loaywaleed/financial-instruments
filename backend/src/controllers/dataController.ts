import { Request, Response } from 'express';
import {
  insertDataService,
  fetchMetadataBySymbol,
  DeleteAllDataService,
} from '../services/dataService';
import metadata from '../data/metadata.json';
import exchange from '../data/exchange.json';
import candle from '../data/candle.json';
import instrumentTypes from '../data/instrumentTypes.json';
import asyncHandler from 'express-async-handler';

/**
 * @route GET /api/data/:symbol
 * @summary Load json data from the files into the database
 * @returns {201} - Data loaded successfully
 */
export const loadData = asyncHandler(async (_req: Request, res: Response) => {
  const result = await insertDataService(metadata, exchange, candle, instrumentTypes);
  res.status(201).json({ message: 'Data loaded successfully', result });
});

/**
 * @route DELETE /api/data
 * @summary Delete all data
 * @returns {204} - No content
 */
export const deleteData = asyncHandler(async (_req: Request, res: Response) => {
  await DeleteAllDataService();
  res.status(204).end();
});
