import request from 'supertest';
import express from 'express';
import {
  getAllInstruments,
  getInstrumentBySymbol,
} from '../../src/controllers/instrumentController';
import {
  fetchAllInstrumentsService,
  fetchInstrumentBySymbolService,
  fetchInstrumentByTypeService,
} from '../../src/services/instrumentService';

jest.mock('../../src/services/instrumentService');

const app = express();
app.use(express.json());
app.get('/api/instruments', getAllInstruments);
app.get('/api/instruments/:id', getInstrumentBySymbol);

describe('Instrument Controller', () => {
  describe('GET /api/instruments', () => {
    it('should return all instruments', async () => {
      const instruments = [{ id: 1, name: 'Instrument 1' }];
      (fetchAllInstrumentsService as jest.Mock).mockResolvedValue(instruments);

      const response = await request(app).get('/api/instruments');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(instruments);
    });

    it('should return instruments by type', async () => {
      const instruments = [{ id: 1, name: 'Instrument 1', type: 'type1' }];
      (fetchInstrumentByTypeService as jest.Mock).mockResolvedValue(instruments);

      const response = await request(app).get('/api/instruments').query({ type: 'type1' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(instruments);
    });
  });

  describe('GET /api/instruments/:id', () => {
    it('should return instrument by symbol', async () => {
      const instrument = { id: 1, name: 'Instrument 1' };
      (fetchInstrumentBySymbolService as jest.Mock).mockResolvedValue(instrument);

      const response = await request(app).get('/api/instruments/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(instrument);
    });
  });
});
