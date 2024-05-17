import connectToMongo from '@/connections/mongo';
import mongoose from 'mongoose';
import { describe, vi, it, expect } from 'vitest';
import mongooseMock from '../../__mocks__/db/mongo_mock';
import { afterEach } from 'node:test';

// Mocking mongoose
vi.mock('mongoose');

describe('connect to mongo', () => {
  afterEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test
  });
  it('should connect to MongoDB successfully', async () => {
    process.env.dbUri = 'mongodb://root:password@localhost:27017/testdb';
    mongooseMock.connect.mockResolvedValueOnce({} as any);
    await connectToMongo();
    expect(mongoose.connect).toHaveBeenCalledWith(process.env.dbUri);
  });
});
