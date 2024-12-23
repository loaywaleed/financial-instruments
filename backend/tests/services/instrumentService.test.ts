import {
  fetchAllInstrumentTypesService,
  fetchAllInstrumentsService,
  fetchInstrumentBySymbolService,
  fetchInstrumentByTypeService,
} from '../../src/services/instrumentService';
import { connectToDatabase } from '../../src/config/database';

jest.mock('../../src/config/database');

describe('Instrument Service Tests', () => {
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

  test('fetchAllInstrumentTypesService should return all instrument types', async () => {
    const mockInstrumentTypes = [{ type: 'stock' }, { type: 'bond' }];
    mockDb.toArray.mockResolvedValue(mockInstrumentTypes);

    const result = await fetchAllInstrumentTypesService();

    expect(connectToDatabase).toHaveBeenCalled();
    expect(mockDb.collection).toHaveBeenCalledWith('instrumentTypes');
    expect(mockDb.find).toHaveBeenCalled();
    expect(result).toEqual(mockInstrumentTypes);
  });

  test('fetchAllInstrumentsService should return all instruments', async () => {
    const mockInstruments = [{ symbol: 'AAPL' }, { symbol: 'GOOGL' }];
    mockDb.toArray.mockResolvedValue(mockInstruments);

    const result = await fetchAllInstrumentsService();

    expect(connectToDatabase).toHaveBeenCalled();
    expect(mockDb.collection).toHaveBeenCalledWith('exchange');
    expect(mockDb.find).toHaveBeenCalled();
    expect(result).toEqual(mockInstruments);
  });

  test('fetchInstrumentBySymbolService should return instrument by symbol', async () => {
    const mockInstrument = { id: 'AAPL', name: 'Apple Inc.' };
    mockDb.findOne.mockResolvedValue(mockInstrument);

    const result = await fetchInstrumentBySymbolService('AAPL');

    expect(connectToDatabase).toHaveBeenCalled();
    expect(mockDb.collection).toHaveBeenCalledWith('instruments');
    expect(mockDb.findOne).toHaveBeenCalledWith({ id: 'AAPL' });
    expect(result).toEqual(mockInstrument);
  });

  test('fetchInstrumentByTypeService should return instruments by type', async () => {
    const mockInstruments = [
      { type: 'stock', symbol: 'AAPL' },
      { type: 'stock', symbol: 'GOOGL' },
    ];
    mockDb.toArray.mockResolvedValue(mockInstruments);

    const result = await fetchInstrumentByTypeService('stock');

    expect(connectToDatabase).toHaveBeenCalled();
    expect(mockDb.collection).toHaveBeenCalledWith('exchange');
    expect(mockDb.find).toHaveBeenCalledWith({ type: 'stock' });
    expect(result).toEqual(mockInstruments);
  });
});
