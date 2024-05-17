import {
  addEmployees,
  deleteEmployeesById,
  getEmployees,
  getEmployeesById,
  updateEmployees,
} from '@/controllers/employees_controller';
import {
  createEmployeesService,
  deleteEmployeesService,
  finalAllEmployeesService,
  findAndUpdateEmployee,
  findEmployeesById,
} from '@/services/employees_service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { afterEach, beforeEach, describe, vi, it, expect, Mock } from 'vitest';
import { employeeFactory } from '../../__mocks__/factory/employee_factory';

vi.mock('../../../services/employees_service.ts', () => ({
  finalAllEmployeesService: vi.fn(),
  findEmployeesById: vi.fn(),
  deleteEmployeesService: vi.fn(),
  createEmployeesService: vi.fn(),
  findAndUpdateEmployee: vi.fn(),
}));
describe('employees controller', () => {
  describe('getEmployees', () => {
    let mockRequest: Request;
    let mockResponse: Response;
    beforeEach(() => {
      mockRequest = {} as Request;
      mockResponse = {
        status: vi.fn(() => mockResponse),
        send: vi.fn(),
      } as unknown as Response;
    });
    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should return list of employees', async () => {
      const mockEmployeesList = [employeeFactory({}), employeeFactory({})];
      (finalAllEmployeesService as Mock).mockResolvedValueOnce(
        mockEmployeesList,
      );

      await getEmployees(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponse.send).toHaveBeenCalledWith(mockEmployeesList);
    });

    it('should handle error', async () => {
      const mockError = new Error('Some error occurred');
      (finalAllEmployeesService as Mock).mockRejectedValueOnce(mockError);
      await getEmployees(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
      expect(mockResponse.send).toHaveBeenCalledWith(
        'error processing the request',
      );
    });
  });
  describe('getEmployeesById', () => {
    describe('getEmployees', () => {
      let mockRequest: Request;
      let mockResponse: Response;
      beforeEach(() => {
        mockRequest = {
          params: {
            id: 'some id',
          },
        } as unknown as Request;
        mockResponse = {
          status: vi.fn(() => mockResponse),
          send: vi.fn(),
        } as unknown as Response;
      });
      afterEach(() => {
        vi.clearAllMocks();
      });

      it('should get employee by id', async () => {
        const mockEmployees = { name: 'John Doe' };
        (findEmployeesById as Mock).mockResolvedValueOnce(mockEmployees);

        await getEmployeesById(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(mockResponse.send).toHaveBeenCalledWith(mockEmployees);
      });
      it('should return not found when employee is not found', async () => {
        (findEmployeesById as Mock).mockResolvedValueOnce(null);

        await getEmployeesById(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
        expect(mockResponse.send).toHaveBeenCalledWith('employee not found');
      });
      it('should handle error', async () => {
        const mockError = new Error('Some error occurred');
        (findEmployeesById as Mock).mockRejectedValueOnce(mockError);

        await getEmployeesById(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(
          StatusCodes.INTERNAL_SERVER_ERROR,
        );
        expect(mockResponse.send).toHaveBeenCalledWith(
          'error processing the request',
        );
      });
    });
  });
  describe('addEmployees', () => {
    let mockRequest: Request;
    let mockResponse: Response;

    beforeEach(() => {
      mockRequest = {
        body: employeeFactory({}),
      } as unknown as Request;
      mockResponse = {
        status: vi.fn(() => mockResponse),
        send: vi.fn(),
      } as unknown as Response;
    });

    afterEach(() => {
      vi.clearAllMocks();
    });
    it('should add employee successfully and return created status', async () => {
      const mockCreatedEmployee = employeeFactory({});
      (createEmployeesService as Mock).mockResolvedValueOnce(
        mockCreatedEmployee,
      );

      await addEmployees(mockRequest, mockResponse);

      expect(createEmployeesService).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.CREATED);
      expect(mockResponse.send).toHaveBeenCalledWith(mockCreatedEmployee);
    });

    it('should handle conflict when employee already exists', async () => {
      const mockError = { code: 11000 }; // MongoDB duplicate key error
      (createEmployeesService as Mock).mockRejectedValueOnce(mockError);

      await addEmployees(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.CONFLICT);
      expect(mockResponse.send).toHaveBeenCalledWith('employee already exists');
    });

    it('should handle error', async () => {
      const mockError = new Error('Some error occurred');
      (createEmployeesService as Mock).mockRejectedValueOnce(mockError);

      await addEmployees(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
      expect(mockResponse.send).toHaveBeenCalledWith(
        'error processing the request',
      );
    });
  });
  describe('updateEmployees', () => {
    let mockRequest: Request;
    let mockResponse: Response;

    beforeEach(() => {
      mockRequest = {
        params: { id: 'exampleId' },
        body: employeeFactory({}),
      } as unknown as Request;
      mockResponse = {
        status: vi.fn(() => mockResponse),
        send: vi.fn(),
      } as unknown as Response;
    });

    afterEach(() => {
      vi.clearAllMocks();
    });
    it('should update employee successfully and return updated employee', async () => {
      const mockUpdatedEmployee = {
        id: 'exampleId',
        name: 'John Doe',
        age: 31,
      };
      (findAndUpdateEmployee as Mock).mockResolvedValueOnce(
        mockUpdatedEmployee,
      );

      await updateEmployees(mockRequest, mockResponse);

      expect(findAndUpdateEmployee).toHaveBeenCalledWith(
        { _id: 'exampleId' },
        mockRequest.body,
        { new: true },
      );
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponse.send).toHaveBeenCalledWith(mockUpdatedEmployee);
    });

    it('should return not found when employee is not found', async () => {
      (findAndUpdateEmployee as Mock).mockResolvedValueOnce(null);

      await updateEmployees(mockRequest, mockResponse);

      expect(findAndUpdateEmployee).toHaveBeenCalledWith(
        { _id: 'exampleId' },
        mockRequest.body,
        { new: true },
      );
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
      expect(mockResponse.send).toHaveBeenCalledWith('Employee was not found');
    });

    it('should handle error', async () => {
      const mockError = new Error('Some error occurred');
      (findAndUpdateEmployee as Mock).mockRejectedValueOnce(mockError);

      await updateEmployees(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
      expect(mockResponse.send).toHaveBeenCalledWith(
        'error processing the request',
      );
    });
  });
  describe('deleteEmployeesById', () => {
    let mockRequest: Request;
    let mockResponse: Response;

    beforeEach(() => {
      mockRequest = {
        params: { id: 'exampleId' },
      } as unknown as Request;
      mockResponse = {
        status: vi.fn(() => mockResponse),
        send: vi.fn(),
        sendStatus: vi.fn(),
      } as unknown as Response;
    });

    afterEach(() => {
      vi.clearAllMocks();
    });
    it('should delete employee successfully and return no content status', async () => {
      (deleteEmployeesService as Mock).mockResolvedValueOnce(true);

      await deleteEmployeesById(mockRequest, mockResponse);

      expect(deleteEmployeesService).toHaveBeenCalledWith({
        _id: 'exampleId',
      });
      expect(mockResponse.sendStatus).toHaveBeenCalledWith(
        StatusCodes.NO_CONTENT,
      );
    });
    it('should return not found when employee is not found', async () => {
      (deleteEmployeesService as Mock).mockResolvedValueOnce(false);

      await deleteEmployeesById(mockRequest, mockResponse);

      expect(deleteEmployeesService).toHaveBeenCalledWith({
        _id: 'exampleId',
      });
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
      expect(mockResponse.send).toHaveBeenCalledWith('Employee was not found');
    });
    it('should handle error', async () => {
      const mockError = new Error('Some error occurred');
      (deleteEmployeesService as Mock).mockRejectedValueOnce(mockError);

      await deleteEmployeesById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
      expect(mockResponse.send).toHaveBeenCalledWith(
        'error processing the request',
      );
    });
  });
});
