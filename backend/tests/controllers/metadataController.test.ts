import request from 'supertest';
import express from 'express';
import { getMetadata } from '../../src/controllers/metadataController';
import * as metadataService from '../../src/services/metadataService';
import { ApiError } from '../../src/utils/apiErrorHandler';

const app = express();
app.use(express.json());
app.get('/api/v1/metadata/', getMetadata);

jest.mock('../../src/services/metadataService');

describe('GET /api/v1/metadata?symbol', () => {
  it('should return 200 and the metadata', async () => {
    const mockMetadata = { symbol: 'AAPL', data: 'some data' };
    (metadataService.fetchMetadataService as jest.Mock).mockResolvedValue(mockMetadata);

    const response = await request(app).get('/api/v1/metadata?symbol=AAPL');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockMetadata);
    expect(metadataService.fetchMetadataService).toHaveBeenCalledWith('AAPL');
  });

  it('should return 500 if an unexpected error occuers', async () => {
    (metadataService.fetchMetadataService as jest.Mock).mockRejectedValue(
      new Error('Internal Server Error Mock')
    );
    const response = await request(app).get('/api/v1/metadata');
    expect(response.status).toBe(500);
  });

  it('should return 400 if an ApiError is thrown inside the controller', async () => {
    (metadataService.fetchMetadataService as jest.Mock).mockRejectedValue(
      new ApiError('Failed to fetch data', 400)
    );
    const response = await request(app).get('/api/v1/metadata?symbol=AAPL');
    expect(response.status).toBe(400);
  });

  it('should return 200 and empty data if no metadata is available', async () => {
    const mockMetadata = {};
    (metadataService.fetchMetadataService as jest.Mock).mockResolvedValue(mockMetadata);

    const response = await request(app).get('/api/v1/metadata?symbol=NAN');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockMetadata);
  });
});
