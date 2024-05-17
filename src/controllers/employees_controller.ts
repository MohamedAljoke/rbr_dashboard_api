import {
  createEmployeesService,
  deleteEmployeesService,
  finalAllEmployeesService,
  findAndUpdateEmployee,
  findEmployeesById,
} from '@/services/employees_service';
import log from '@/utils/logger';
import { EmployeesInput } from '@/validator/employees_validator';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function getEmployees(req: Request, res: Response) {
  try {
    const employeesList = await finalAllEmployeesService();
    return res.status(StatusCodes.OK).send(employeesList);
  } catch (e) {
    log.error(e);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send('error processing the request');
  }
}
export async function getEmployeesById(req: Request, res: Response) {
  const _id = req.params.id;
  try {
    const employee = await findEmployeesById({ _id });
    if (employee) {
      return res.status(StatusCodes.OK).send(employee);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send('employee not found');
    }
  } catch (e) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send('error processing the request');
  }
}

//adds ONE employee
export async function addEmployees(
  req: Request<{}, {}, EmployeesInput['body']>,
  res: Response,
) {
  const body = req.body;
  try {
    const employees = await createEmployeesService(body);
    return res.status(StatusCodes.CREATED).send(employees);
  } catch (e: any) {
    log.error(e);
    if (e.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send('employee already exists');
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send('error processing the request');
  }
}

export async function updateEmployees(req: Request, res: Response) {
  const _id = req.params.id;
  const update = req.body;
  try {
    const updatedProduct = await findAndUpdateEmployee({ _id }, update, {
      new: true, //this gives the updated object
    });
    if (!updatedProduct) {
      return res.status(StatusCodes.NOT_FOUND).send('Employee was not found');
    }
    return res.status(StatusCodes.OK).send(updatedProduct);
  } catch (e) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send('error processing the request');
  }
}

export async function deleteEmployeesById(req: Request, res: Response) {
  const _id = req.params.id;
  try {
    const result = await deleteEmployeesService({ _id });
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).send('Employee was not found');
    }
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (e) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send('error processing the request');
  }
}
