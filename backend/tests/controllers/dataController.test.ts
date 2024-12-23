import request from 'supertest';
import express from 'express';
import { loadData, deleteData } from '../../src/controllers/dataController';
import * as dataService from '../../src/services/dataService';

const app = express();
app.use(express.json());
app.get('/api/data/:symbol', loadData);
app.delete('/api/data', deleteData);

jest.mock('../../src/services/dataService');

describe('Data Controller', () => {
  describe('loadData', () => {
    it('should load data and return 201 status', async () => {
      const mockInsertDataService = jest
        .spyOn(dataService, 'insertDataService')
        .mockResolvedValue('mockResult');

      const response = await request(app).get('/api/data/someSymbol');

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Data loaded successfully', result: 'mockResult' });
      expect(mockInsertDataService).toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(Object),
        expect.any(Object),
        expect.any(Object)
      );
    });
  });

  describe('deleteData', () => {
    it('should delete all data and return 204 status', async () => {
      const mockDeleteAllDataService = jest
        .spyOn(dataService, 'DeleteAllDataService')
        .mockResolvedValue('');

      const response = await request(app).delete('/api/data');

      expect(response.status).toBe(204);
      expect(mockDeleteAllDataService).toHaveBeenCalled();
    });
  });
});
