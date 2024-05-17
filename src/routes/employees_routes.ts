import {
  addEmployees,
  deleteEmployeesById,
  getEmployees,
  getEmployeesById,
  updateEmployees,
} from '@/controllers/employees_controller';
import { Router } from 'express';

const employeesRoutes = Router();

employeesRoutes.get('/', getEmployees);
employeesRoutes.get('/:id', getEmployeesById);
employeesRoutes.post('/', addEmployees);
employeesRoutes.put('/:id', updateEmployees);
employeesRoutes.delete('/:id', deleteEmployeesById);

export default employeesRoutes;
