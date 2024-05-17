import mongoose from 'mongoose';

export interface EmployeesDocument extends mongoose.Document {
  name: string;
  position: string;
  department: string;
  admissionDate: Date;
  createAt: Date;
  updateAt: Date;
}

//  - Validar os campos do formulário antes de enviar. ?? não tinha na tarefa os requisitos dos campos
// colocar todos como required com max de 254 char
// colocar nome como unique.
const employeesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    admissionDate: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const EmployeesModel = mongoose.model<EmployeesDocument>(
  'Employees',
  employeesSchema,
);

export default EmployeesModel;
