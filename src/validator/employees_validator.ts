import zod, { object, string, TypeOf, array } from 'zod';

const employeesSchema = zod.object({
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
export type EmployeesInput = TypeOf<typeof employeesSchema>;
