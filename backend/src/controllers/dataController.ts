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

/**
 * Load financial data
 * @route POST /api/data/load
 * @summary Load financial data
 * @param {string} file.body.required - The file data to load
 */
export const loadData = asyncHandler(async (_req: Request, res: Response) => {
  const result = await insertDataService(metadata, exchange, candle, instrumentTypes);
  res.status(201).json({ message: 'Data loaded successfully', result });
});

/**
 * Get metadata about loaded financial data
 * @route GET /api/data
 * @summary Get metadata about loaded financial data
 * @returns {object} 200 - Retrieved metadata successfully
 */
export const getmetaData = asyncHandler(async (_req: Request, res: Response) => {
  const result = await fetchMetadataService();
  res.status(200).json(result);
});

/**
 * Delete all data
 * @route DELETE /api/data
 * @summary Delete all data
 * @returns {object} 204 - No content
 */
export const deleteData = asyncHandler(async (_req: Request, res: Response) => {
  await DeleteAllDataService();
  res.status(204).end();
});

/**
 * Get metadata by symbol
 * @route GET /api/data/:symbol
 * @summary Get metadata by symbol
 * @param {string} symbol.params.required - Symbol
 * @returns {object} 200 - Retrieved metadata successfully
 */
export const getMetadataBySymbol = asyncHandler(async (req: Request, res: Response) => {
  const result = await fetchMetadataBySymbol(req.params.symbol);
  res.status(200).json(result);
});
