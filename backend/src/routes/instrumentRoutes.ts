/* Desc: Instrument routes */
import router from 'express';
import { getAllInstruments } from '../controllers/instrumentController';

const instrumentRoutes = router.Router();

/**
 * @swagger
 * /api/v1/instruments:
 *   get:
 *     summary: Get all instruments
 *     tags: [Instruments]
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "All data retrieved successfully"
 *       500:
 *         description: Server error
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * /api/v1/instruments?symbol={symbol}:
 *   get:
 *     summary: Get all instruments by symbol
 *     tags: [Instruments]
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "All data retrieved successfully"
 *       500:
 *         description: Server error
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * /api/v1/instruments?type={type}:
 *   get:
 *     summary: Get all instruments by type
 *     tags: [Instruments]
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "All data retrieved successfully"
 *       500:
 *         description: Server error
 *       400:
 *         description: Bad request
 */
instrumentRoutes.get('/', getAllInstruments);

export default instrumentRoutes;
