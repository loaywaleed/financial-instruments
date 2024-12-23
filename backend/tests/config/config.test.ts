import { MongoClient } from 'mongodb';
import { connectToDatabase } from '../../src/config/database';
import { ApiError } from '../../src/utils/apiErrorHandler';

jest.mock('mongodb');
jest.mock('../../src/utils/apiErrorHandler');

describe('connectToDatabase', () => {
  let mockConnect: jest.Mock;
  let mockDb: jest.Mock;

  beforeEach(() => {
    mockConnect = jest.fn();
    mockDb = jest.fn().mockReturnValue({ collection: jest.fn() });
    (MongoClient as unknown as jest.Mock).mockImplementation(() => ({
      connect: mockConnect,
      db: mockDb,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should connect to the database and return the db instance', async () => {
    await connectToDatabase();
    expect(mockConnect).toHaveBeenCalled();
    expect(mockDb).toHaveBeenCalledWith('mydb');
  });

  it('should not reconnect if client is already connected', async () => {
    mockConnect.mockClear();
    await connectToDatabase();
    expect(mockConnect).not.toHaveBeenCalled();
  });
});
