import router from 'express';
import { getAllInstruments, getInstrumentBySymbol } from '../controllers/instrumentController';
import exp from 'constants';

const instrumentRoutes = router.Router();

instrumentRoutes.get('/', getAllInstruments);

export default instrumentRoutes;
