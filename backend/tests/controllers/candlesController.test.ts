import request from 'supertest';
import express from 'express';
import { getCandles } from '../../src/controllers/candlesController';
import * as candlesService from '../../src/services/candlesService';
import { ApiError } from '../../src/utils/apiErrorHandler';

const app = express();
app.get('/api/v1/candles', getCandles);

jest.mock('../../src/services/candlesService');

describe('GET /api/v1/candles', () => {
  it('should return 200 and the candles data', async () => {
    const mockCandlesData = [{ open: 1, close: 2, high: 3, low: 4 }];
    (candlesService.fetchCandlesService as jest.Mock).mockResolvedValue(mockCandlesData);

    const response = await request(app).get('/api/v1/candles?symbol=BTC');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCandlesData);
    expect(candlesService.fetchCandlesService).toHaveBeenCalledWith('BTC');
  });

  it('should return 500 if an error is thrown inside the controller', async () => {
    (candlesService.fetchCandlesService as jest.Mock).mockRejectedValue(
      new Error('Internal Server Error Mock')
    );
    const response = await request(app).get('/api/v1/candles?symbol=BTC');
    expect(response.status).toBe(500);
  });

  it('should return 400 if an ApiError is thrown inside the controller', async () => {
    (candlesService.fetchCandlesService as jest.Mock).mockRejectedValue(
      new ApiError('Failed to fetch data', 400)
    );
    const response = await request(app).get('/api/v1/candles?symbol=BTC');
    expect(response.status).toBe(400);
  });
});
