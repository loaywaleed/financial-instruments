import {
  fetchMetadataService,
  fetchAllMetadataService,
  fetchMetadataBySymbolService,
} from '../../src/services/metadataService';
import { connectToDatabase } from '../../src/config/database';

jest.mock('../../src/config/database');

describe('Metadata Service Tests', () => {
  let mockDb: any;

  beforeAll(() => {
    mockDb = {
      collection: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      findOne: jest.fn(),
      toArray: jest.fn(),
    };
    (connectToDatabase as jest.Mock).mockResolvedValue(mockDb);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchMetadataService', () => {
    it('should return metadata for the given symbol', async () => {
      const symbol = 'AAPL';
      const mockData = { symbol: 'AAPL' };
      mockDb.findOne.mockResolvedValue(mockData);
      const result = await fetchMetadataService(symbol);
      expect(result).toEqual(mockData);
    });

    it('should return all metadata when symbol is not provided', async () => {
      const mockData = [{ symbol: 'AAPL' }, { symbol: 'GOOGL' }];
      mockDb.toArray.mockResolvedValue(mockData);
      const result = await fetchMetadataService(null);
      expect(result).toEqual(mockData);
    });
  });

  describe('fetchAllMetadataService', () => {
    it('should return all metadata', async () => {
      const mockData = [{ symbol: 'AAPL' }, { symbol: 'GOOGL' }];
      mockDb.toArray.mockResolvedValue(mockData);
      const result = await fetchAllMetadataService();
      expect(result).toEqual(mockData);
    });
  });

  describe('fetchMetadataBySymbolService', () => {
    it('should return metadata for the given symbol', async () => {
      const symbol = 'AAPL';
      const mockData = { symbol: 'AAPL' };
      mockDb.findOne.mockResolvedValue(mockData);
      const result = await fetchMetadataBySymbolService(symbol);
      expect(result).toEqual(mockData);
    });
  });
});
