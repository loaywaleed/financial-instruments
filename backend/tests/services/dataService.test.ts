import { insertDataService, DeleteAllDataService } from '../../src/services/dataService';
import { connectToDatabase } from '../../src/config/database';

jest.mock('../../src/config/database');

describe('Data Service Tests', () => {
  let dbMock: any;

  beforeAll(() => {
    dbMock = {
      collection: jest.fn().mockReturnThis(),
      insertMany: jest.fn(),
      find: jest.fn().mockReturnThis(),
      toArray: jest.fn(),
      deleteMany: jest.fn(),
      findOne: jest.fn(),
    };
    (connectToDatabase as jest.Mock).mockResolvedValue(dbMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('insertDataService', () => {
    it('should insert data successfully', async () => {
      const metadata_raw = { hits: { hits: [{ _source: 'metadata' }] } };
      const exchange_raw = { hits: { hits: [{ _source: 'exchange' }] } };
      const candle_raw = { hits: { hits: [{ _source: 'candle' }] } };
      const instrumentTypes = ['type1', 'type2'];

      dbMock.insertMany.mockResolvedValueOnce({});

      const result = await insertDataService(
        metadata_raw,
        exchange_raw,
        candle_raw,
        instrumentTypes
      );

      expect(result).toBe('Data loaded successfully');
      expect(dbMock.collection).toHaveBeenCalledWith('metadata');
      expect(dbMock.collection).toHaveBeenCalledWith('exchange');
      expect(dbMock.collection).toHaveBeenCalledWith('candle');
      expect(dbMock.collection).toHaveBeenCalledWith('instrumentTypes');
      expect(dbMock.insertMany).toHaveBeenCalledTimes(4);
    });
  });

  describe('DeleteAllDataService', () => {
    it('should delete all data successfully', async () => {
      dbMock.deleteMany.mockResolvedValueOnce({});

      const result = await DeleteAllDataService();

      expect(result).toBe('Data deleted successfully');
      expect(dbMock.collection).toHaveBeenCalledWith('metadata');
      expect(dbMock.collection).toHaveBeenCalledWith('exchange');
      expect(dbMock.collection).toHaveBeenCalledWith('candle');
      expect(dbMock.collection).toHaveBeenCalledWith('instrumentTypes');
      expect(dbMock.deleteMany).toHaveBeenCalledTimes(4);
    });
  });
});
