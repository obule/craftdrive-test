import { Employees } from '../data/employee-data';
import { BadRequestError } from '../errors/bad-request-error';
import { NotFoundError } from '../errors/not-found-error';

/**
 * Employee Service class to handle CRUD employee
 * operations
 */
export class EmployeeService {
  /**
   * Get one employee
   * @param id number
   */
  static findOne(id: number): EmployeeAttributes[] {
    const employees: EmployeeAttributes[] = Employees;
    const employee = employees.filter((employee) => employee.id == id);
    if (employee.length === 0) throw new NotFoundError('Employee not found');
    return employee;
  }

  static findAll({
    skip = undefined,
    limit = undefined,
  } = {}): EmployeeAttributes[] {
    const shouldPaginate = this.needsPaginationation(skip, limit);
    if (shouldPaginate) {
      return this.paginate(Employees, skip, limit);
    }
    return Employees;
  }

  static create(employee: EmployeeAttributes): EmployeeAttributes {
    const lastEmployee = Employees.pop();
    const id = lastEmployee!.id + 1;
    const { firstName, lastName, gender, email } = employee;
    Employees.push({ id, firstName, lastName, gender, email });
    return employee;
  }

  /**
   * Update employee
   * @param employee EmployeeAttributes
   * @returns EmployeeAttributes
   */
  static update(employee: EmployeeAttributes): EmployeeAttributes {
    const employeeIndex = Employees.findIndex((obj) => obj.id === employee.id);
    if (employeeIndex < 0) {
      throw new NotFoundError('Employee not found');
    }
    Employees[employeeIndex] = employee;
    return employee;
  }

  /**
   * Static method to check if a request needs pagination
   * @param skip number
   * @param limit number
   * @returns boolean
   */
  static needsPaginationation(
    skip: number | undefined,
    limit: number | undefined,
  ): boolean {
    return Number.isInteger(skip) && Number.isInteger(limit);
  }

  /**
   * Remove an employee
   * @param id number
   * @returns EmployeeAtrribute[]
   */
  static remove(id: number) {
    const employeeIndex = Employees.findIndex((obj) => obj.id === id);
    if (employeeIndex <= 0) {
      throw new NotFoundError('Employee not found');
    }
    Employees.splice(0, employeeIndex);
    return true;
  }

  /**
   * Static method to paginate a request
   * @param employees EmployeeAtrribute[]
   * @param skip number
   * @param limit number
   * @returns EmployeeAtrribute[]
   */
  static paginate(
    employees: EmployeeAttributes[],
    skip: number | undefined,
    limit: number | undefined,
  ): EmployeeAttributes[] {
    try {
      skip = skip || 1;
      return employees.slice((skip - 1) * skip, limit! * skip);
    } catch (error) {
      throw new BadRequestError('Error paginating');
    }
  }
}

interface EmployeeAttributes {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
}
