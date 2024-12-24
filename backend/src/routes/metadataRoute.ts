/* Desc: Metadata route */
import express from 'express';
import { getMetadata } from '../controllers/metadataController';

const metadataRoutes = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve metadata
 *     description: Retrieve metadata information.
 *     responses:
 *       200:
 *         description: Successfully retrieved metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
metadataRoutes.get('/', getMetadata);

export default metadataRoutes;
