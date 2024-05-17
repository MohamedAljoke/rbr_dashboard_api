import zod, { object, string, TypeOf, array } from 'zod';

const employeeObject = object({
  name: zod
    .string()
    .min(1, { message: 'Error name is required' })
    .max(254, { message: 'Error name is too long' }),
  position: zod
    .string()
    .min(1, { message: 'Error position is required' })
    .max(254, { message: 'Error position is too long' }),
  department: zod
    .string()
    .min(1, { message: 'Error department is required' })
    .max(254, { message: 'Error department is too long' }),
  admissionDate: zod
    .string()
    .min(1, { message: 'Error admissionDate is required' })
    .max(254, { message: 'Error admissionDate is too long' }),
});
export const employeesSchema = zod.object({
  body: employeeObject,
});
export type EmployeesInput = TypeOf<typeof employeesSchema>;

export const employeeIdParams = object({
  params: object({
    id: string({
      required_error: 'employee id is required',
    }),
  }),
});
export type EmployeeIdParams = TypeOf<typeof employeeIdParams>;

export const updateEmployeeSchema = object({
  body: object({
    name: string().optional(),
    department: string().optional(),
    position: string().optional(),
    admissionDate: string().optional(),
  }),
  params: object({
    id: string({
      required_error: 'employee is required',
    }),
  }),
});
