import {
  fetchCandlesService,
  getAllCandlesService,
  getCandleBySymbolService,
} from '../../src/services/candlesService';
import { connectToDatabase } from '../../src/config/database';
import { ApiError } from '../../src/utils/apiErrorHandler';

jest.mock('../../src/config/database');

describe('Candles Service', () => {
  const mockDb = {
    collection: jest.fn().mockReturnThis(),
    find: jest.fn().mockReturnThis(),
    toArray: jest.fn(),
  };

  beforeEach(() => {
    (connectToDatabase as jest.Mock).mockResolvedValue(mockDb);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchCandlesService', () => {
    it('should call getCandleBySymbolService when symbol is provided', async () => {
      const mockData = [{ symbol: 'BTC' }];
      mockDb.toArray.mockResolvedValue(mockData);

      const result = await fetchCandlesService('BTC');
      expect(result).toEqual(mockData);
      expect(mockDb.find).toHaveBeenCalledWith({ symbol: 'BTC' });
    });

    it('should call getAllCandlesService when symbol is null', async () => {
      const mockData = [{ symbol: 'BTC' }, { symbol: 'ETH' }];
      mockDb.toArray.mockResolvedValue(mockData);

      const result = await fetchCandlesService(null);
      expect(result).toEqual(mockData);
      expect(mockDb.find).toHaveBeenCalledWith({});
    });
  });

  describe('getAllCandlesService', () => {
    it('should fetch all candles', async () => {
      const mockData = [{ symbol: 'BTC' }, { symbol: 'ETH' }];
      mockDb.toArray.mockResolvedValue(mockData);

      const result = await getAllCandlesService();
      expect(result).toEqual(mockData);
      expect(mockDb.find).toHaveBeenCalledWith({});
    });

    it('should throw ApiError when database operation fails', async () => {
      mockDb.toArray.mockRejectedValue(new ApiError('DB Error', 500));

      await expect(getAllCandlesService()).rejects.toThrow(ApiError);
    });
  });

  describe('getCandleBySymbolService', () => {
    it('should fetch candles by symbol', async () => {
      const mockData = [{ symbol: 'BTC' }];
      mockDb.toArray.mockResolvedValue(mockData);

      const result = await getCandleBySymbolService('BTC');
      expect(result).toEqual(mockData);
      expect(mockDb.find).toHaveBeenCalledWith({ symbol: 'BTC' });
    });

    it('should throw ApiError when database operation fails', async () => {
      mockDb.toArray.mockRejectedValue(new ApiError('DB Error'));

      await expect(getCandleBySymbolService('BTC')).rejects.toThrow(ApiError);
    });
  });
});
