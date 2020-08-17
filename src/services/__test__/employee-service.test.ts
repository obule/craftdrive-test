import { EmployeeService } from '../../services/employee';

it('should return an employee', async () => {
  const employee = EmployeeService.findOne(1);
  expect(employee.length).toEqual(1);
});
it('should throw error for employee not found', async () => {
  expect(() => {
    EmployeeService.findOne(1093994);
  }).toThrow('Employee not found');
});
it('should return length of array greater than 20', async () => {
  const employees = EmployeeService.findAll();
  expect(employees.length).toBeGreaterThan(5);
});

it('should return true when pagination is needed', async () => {
  const needPagination = EmployeeService.needsPaginationation(10, 20);
  expect(needPagination).toEqual(true);
});

it('should paginate result', async () => {
  const employees = [
    {
      id: 1,
      firstName: 'Marshal',
      lastName: 'Erricker',
      email: 'merricker0@github.com',
      gender: 'Male',
    },
    {
      id: 2,
      firstName: 'Katuscha',
      lastName: 'Noonan',
      email: 'knoonan1@oakley.com',
      gender: 'Female',
    },
    {
      id: 3,
      firstName: 'Bryce',
      lastName: 'Carpenter',
      email: 'bcarpenter2@walmart.com',
      gender: 'Male',
    },
    {
      id: 4,
      firstName: 'Archibald',
      lastName: 'Back',
      email: 'aback3@parallels.com',
      gender: 'Male',
    },
    {
      id: 5,
      firstName: 'Nanice',
      lastName: 'Giddings',
      email: 'ngiddings4@msn.com',
      gender: 'Female',
    },
    {
      id: 6,
      firstName: 'Calla',
      lastName: 'Diament',
      email: 'cdiament5@huffingtonpost.com',
      gender: 'Female',
    },
    {
      id: 7,
      firstName: 'Damita',
      lastName: 'Eberdt',
      email: 'deberdt6@topsy.com',
      gender: 'Female',
    },
  ];
  const paginatedEmployees = EmployeeService.paginate(employees, 1, 3);
  expect(paginatedEmployees.length).toEqual(3);
});

it('should update an employee', async () => {
  const employee = EmployeeService.update({
    id: 1,
    email: 'pp@test.com',
    lastName: 'Okon',
    gender: 'Female',
    firstName: 'James',
  });
  expect(employee.firstName).toEqual('James');
  expect(employee.email).toEqual('pp@test.com');
  expect(employee.lastName).toEqual('Okon');
});

it('should throw error for employee not found', async () => {
  expect(() => {
    EmployeeService.update({
      id: 5000,
      email: 'pp@test.com',
      lastName: 'Okon',
      gender: 'Female',
      firstName: 'James',
    });
  }).toThrow('Employee not found');
});

it('should add to employee', async () => {
  const employee = EmployeeService.create({
    id: 100,
    email: 'james@test.com',
    lastName: 'Akin',
    gender: 'Female',
    firstName: 'Yemi',
  });
  expect(employee.firstName).toEqual('Yemi');
  expect(employee.email).toEqual('james@test.com');
  expect(employee.lastName).toEqual('Akin');
});
