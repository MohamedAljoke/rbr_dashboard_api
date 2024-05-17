import { beforeEach } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import mongoose, { Mongoose } from 'mongoose';

beforeEach(() => {
  mockReset(mongooseMock);
});
const mongooseMock = mockDeep<Mongoose>();
export default mongooseMock;
