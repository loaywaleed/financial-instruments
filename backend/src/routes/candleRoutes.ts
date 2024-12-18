import express from 'express';
import { getCandles } from '../controllers/candlesController';

const candleRoutes = express.Router();

/**
 * @swagger
 * /api/candles/{symbol}/{exchange}/{interval}:
 *   get:
 *     summary: Get exchange candles
 *     tags: [Candles]
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         description: Symbol
 *         schema:
 *           type: string
 *       - in: path
 *         name: exchange
 *         required: true
 *         description: Exchange
 *         schema:
 *           type: string
 *       - in: path
 *         name: interval
 *         required: true
 *         description: Interval
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retrieved exchange candles successfully
 */

candleRoutes.get('/', getCandles);

export default candleRoutes;
