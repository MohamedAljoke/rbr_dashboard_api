import {
  employeesSchema,
  updateEmployeeSchema,
} from '@/validator/employees_validator';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('employees validator', () => {
  it('Should validate employee object correctly', () => {
    const validEmployee = {
      body: {
        name: 'John Doe',
        position: 'Software Engineer',
        department: 'Engineering',
        admissionDate: '2024-05-17',
      },
    };
    expect(() => employeesSchema.parse(validEmployee)).not.toThrow();
  });
  it('Should invalidate employee object when missing name', () => {
    const invalidEmployee = {
      body: {
        position: 'Software Engineer',
        department: 'Engineering',
        admissionDate: '2024-05-17',
      },
    };
    expect(() => employeesSchema.parse(invalidEmployee)).toThrow();
  });
  it('Should validate update employee object', () => {
    const validUpdate = {
      body: {
        name: 'Jane Doe',
        department: 'HR',
      },
      params: {
        id: '123456',
      },
    };
    expect(() => updateEmployeeSchema.parse(validUpdate)).not.toThrow();
  });
  it('Should invalidade update employee object (invalid parameter)', () => {
    const invalidUpdate = {
      body: {
        name: 123, // Name should be a string
        department: 'HR',
      },
      params: {
        id: '123456',
      },
    };
    expect(() => updateEmployeeSchema.parse(invalidUpdate)).toThrow();
  });
});
