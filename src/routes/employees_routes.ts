import {
  addEmployees,
  deleteEmployeesById,
  getEmployees,
  getEmployeesById,
  updateEmployees,
} from '@/controllers/employees_controller';
import validate from '@/middelwares/validate_resources';
import {
  employeeIdParams,
  employeesSchema,
  updateEmployeeSchema,
} from '@/validator/employees_validator';
import { Router } from 'express';

const employeesRoutes = Router();

employeesRoutes.get('/', getEmployees);
employeesRoutes.get('/:id', validate(employeeIdParams), getEmployeesById);
employeesRoutes.post('/', validate(employeesSchema), addEmployees);
employeesRoutes.put('/:id', validate(updateEmployeeSchema), updateEmployees);
employeesRoutes.delete('/:id', validate(employeeIdParams), deleteEmployeesById);

export default employeesRoutes;
