/* Desc: Instrument types routes */
import express from 'express';
import { getAllInstrumentTypes } from '../controllers/instrumentTypesController';

const instrumentTypesRoutes = express.Router();

/**
 * @swagger
 * /api/v1/instrumentTypes:
 *   get:
 *     summary: Get all instrument types
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
 */
instrumentTypesRoutes.get('/', getAllInstrumentTypes);

export default instrumentTypesRoutes;
