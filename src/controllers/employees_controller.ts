import { Request, Response } from 'express';

export async function getEmployees(req: Request<{}, {}, {}>, res: Response) {
  return res.status(200).send('Lista de users');
}
export async function getEmployeesById(
  req: Request<{}, {}, {}>,
  res: Response,
) {
  return res.status(200).send('user');
}

//adds ONE employee
export async function addEmployees(req: Request<{}, {}, {}>, res: Response) {
  return res.status(200).send('employees added');
}

export async function updateEmployees(req: Request<{}, {}, {}>, res: Response) {
  return res.status(200).send('employees updateEmployees');
}

export async function deleteEmployeesById(
  req: Request<{}, {}, {}>,
  res: Response,
) {
  return res.status(200).send('employees deleteEmployeesById');
}
