import { EmployeesInput } from '@/validator/employees_validator';

export function employeeFactory(
  employee: Partial<EmployeesInput['body']>,
): EmployeesInput['body'] {
  return {
    name: 'some name',
    position: 'some position',
    department: 'some department',
    admissionDate: 'some date',
    ...employee,
  };
}
