import express from 'express';
import { getMetadata } from '../controllers/metadataController';

const metadataRoutes = express.Router();

metadataRoutes.get('/', getMetadata);

export default metadataRoutes;
