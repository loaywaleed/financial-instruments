import express from 'express';
import {
  loadData,
  getmetaData,
  deleteData,
} from '../controllers/dataController';

const dataRoutes = express.Router();

dataRoutes.post('/load', loadData);
dataRoutes.get('/', getmetaData);
dataRoutes.delete('/', deleteData);

export default dataRoutes;
