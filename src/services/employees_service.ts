import EmployeesModel, { EmployeesDocument } from '@/model/employees_model';
import { EmployeesInput } from '@/validator/employees_validator';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

export async function createEmployeesService(input: EmployeesInput['body']) {
  return await EmployeesModel.create(input);
}
export async function finalAllEmployeesService() {
  return EmployeesModel.find()
    .select('-__v')
    .lean({
      transform: (doc) => {
        //transforming _id to id -> (helps frontend to use other dbs not necessary could do later the inverse if need it)
        doc.id = doc._id;
        delete doc._id;
        return doc;
      },
    });
}
export async function deleteEmployeesService(
  query: FilterQuery<EmployeesDocument>,
) {
  return EmployeesModel.findOneAndDelete(query);
}

export async function findEmployeesById(
  query: FilterQuery<EmployeesDocument>,
  option: QueryOptions = { lean: true },
) {
  return EmployeesModel.findOne(query, {}, option)
    .select('-__v')
    .lean({
      transform: (doc) => {
        //transforming _id to id -> (helps frontend to use other dbs not necessary could do later the inverse if need it)
        doc.id = doc._id;
        delete doc._id;
        return doc;
      },
    });
}

export async function findAndUpdateEmployee(
  query: FilterQuery<EmployeesDocument>,
  update: UpdateQuery<EmployeesDocument>,
  options: QueryOptions,
) {
  return EmployeesModel.findOneAndUpdate(query, update, options);
}
