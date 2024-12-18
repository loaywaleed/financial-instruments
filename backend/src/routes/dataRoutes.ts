import express from 'express';
import { loadData, getmetaData, deleteData } from '../controllers/dataController';

/*@TODO: Add the necessary content for the data controller */
const dataRoutes = express.Router();
/**
 * @swagger
 * /api/data/load:
 *   post:
 *     summary: Load financial data
 *     tags: [Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 description: The file data to load
 *           example:
 *             file: "sample_financial_data.csv"
 *     responses:
 *       200:
 *         description: Data loaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Data loaded successfully"
 *       400:
 *         description: Bad request
 */
dataRoutes.post('/load', loadData);

/**
 * @swagger
 * /api/data:
 *   get:
 *     summary: Get metadata about loaded financial data
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: Retrieved metadata successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 records:
 *                   type: number
 *                 lastUpdated:
 *                   type: string
 *             example:
 *               records: 1000
 *               lastUpdated: "2023-06-14T10:00:00Z"
 */
dataRoutes.get('/', getmetaData);

/**
 * @swagger
 * /api/data:
 *   delete:
 *     summary: Delete all loaded financial data
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: Data deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "All data deleted successfully"
 *       500:
 *         description: Server error
 */
dataRoutes.delete('/', deleteData);

export default dataRoutes;
