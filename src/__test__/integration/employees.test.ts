import createServer from '@/connections/server';
import { appVersion } from '@/routes';
import {
  createEmployeesService,
  finalAllEmployeesService,
} from '@/services/employees_service';
import request from 'supertest';
import { afterEach, describe, expect, it, Mock, vi } from 'vitest';
import { employeeFactory } from '../__mocks__/factory/employee_factory';
import { EmployeesInput } from '@/validator/employees_validator';
import { StatusCodes } from 'http-status-codes';

vi.mock('../../services/employees_service.ts', () => ({
  finalAllEmployeesService: vi.fn(),
  findEmployeesById: vi.fn(),
  deleteEmployeesService: vi.fn(),
  createEmployeesService: vi.fn(),
  findAndUpdateEmployee: vi.fn(),
}));
describe('GET /api/example', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should respond with the version message', async () => {
    const response = await request(createServer()).get('/api/version');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ version: appVersion });
  });
  it('should get employees correctly', async () => {
    const mockEmployeesList = [employeeFactory({}), employeeFactory({})];
    (finalAllEmployeesService as Mock).mockResolvedValueOnce(mockEmployeesList);
    const response = await request(createServer()).get('/api/employees');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockEmployeesList);
  });
  it('should add employees correctly', async () => {
    const employeeToCreate = employeeFactory({});
    const mockRequestBody: EmployeesInput['body'] = employeeToCreate;

    (createEmployeesService as Mock).mockResolvedValueOnce(employeeToCreate);

    const response = await request(createServer())
      .post('/api/employees')
      .send(mockRequestBody);

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body).toEqual(employeeToCreate);
  });
  it('should handle duplicate employee error', async () => {
    const duplicateError = { code: 11000 };
    const mockRequestBody: EmployeesInput['body'] = employeeFactory({});
    (createEmployeesService as Mock).mockRejectedValueOnce(duplicateError);

    const response = await request(createServer())
      .post('/api/employees')
      .send(mockRequestBody);

    // Assert the response
    expect(response.status).toBe(StatusCodes.CONFLICT);
    expect(response.text).toBe('employee already exists');
  });
  it('should handle internal server error', async () => {
    const mockRequestBody: EmployeesInput['body'] = employeeFactory({});
    const genericError = new Error('Internal server error');
    (createEmployeesService as Mock).mockRejectedValueOnce(genericError);

    const response = await request(createServer())
      .post('/api/employees')
      .send(mockRequestBody);
    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.text).toBe('error processing the request');
  });
  //TODO: integration test for update delete
});
