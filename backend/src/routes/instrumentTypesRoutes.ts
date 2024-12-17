import express from 'express';
import { getAllInstrumentTypes } from '../controllers/instrumentTypesController';

const instrumentTypesRoutes = express.Router();

instrumentTypesRoutes.get('/', getAllInstrumentTypes);

export default instrumentTypesRoutes;
