import request from 'supertest';
import { app } from '../../app';

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIEFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiYWRtaW4ifQ.9v5NoVLOjyj5HZwPkPFKb73heDebRT-WsohLqoPO8Qk`;

it('returns a 401 unauthorize request', async () => {
  await request(app)
    .post('/employee')
    .send({
      email: 'test@test.com',
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
    })
    .expect(401);
});

it('returns 400 with bad email', async () => {
  const response = await request(app)
    .post('/employee')
    .set({ authorization: token })
    .send({
      email: 'test',
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
    })
    .expect(400);
  expect(response.body.errors.length).toBeGreaterThanOrEqual(1);
});
it('should create an employee', async () => {
  const response = await request(app)
    .post('/employee')
    .set({ authorization: token })
    .send({
      email: 'test@test.com',
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
    })
    .expect(201);

  expect(response.body.email).toEqual('test@test.com');
});

it('should return unauthoriza 401 when updating an employee without token', async () => {
  await request(app)
    .patch('/employee')
    .send({
      email: 'test@test.com',
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
    })
    .expect(401);
});
it('should return 400 when updating an employee without id', async () => {
  await request(app)
    .patch('/employee')
    .set({ authorization: token })
    .send({
      email: 'test@test.com',
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
    })
    .expect(400);
});
it('should return 404 when updating an employee whoes id does not exist', async () => {
  await request(app)
    .patch('/api/v1/employee')
    .set({ authorization: token })
    .send({
      email: 'test@test.com',
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
      id: 78484,
    })
    .expect(404);
});
it('should return 200 after successful employee update', async () => {
  const response = await request(app)
    .patch('/employee')
    .set({ authorization: token })
    .send({
      email: 'test@test.com',
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
      id: 1,
    })
    .expect(200);
  expect(response.body.email).toEqual('test@test.com');
});
it('should return 401  when accessing an employee route', async () => {
  await request(app).get('/employee/89').send({}).expect(401);
});
it('should return 404  when accessing an employee that does not exist', async () => {
  await request(app)
    .get('/employee/9097')
    .set({ authorization: token })
    .send({})
    .expect(404);
});
it('should return 200  when fetching an employee ', async () => {
  const response = await request(app)
    .get('/employee/1')
    .set({ authorization: token })
    .send({})
    .expect(200);

  expect(response.body.length).toEqual(1);
});
it('should return 200  when getting all employess ', async () => {
  const response = await request(app)
    .get('/employee')
    .set({ authorization: token })
    .send({})
    .expect(200);

  expect(response.body.length).toBeGreaterThan(5);
});
it('should return 401  when deleting an employee without token ', async () => {
  await request(app).delete('/employee/1').send({}).expect(401);
});
it('should return 404  when deleting an employee that does not exist ', async () => {
  await request(app)
    .delete('/employee/98859')
    .set({ authorization: token })
    .send({})
    .expect(404);
});
it('should return 200  and true when deleting an employee successfully', async () => {
  const response = await request(app)
    .delete('/employee/30')
    .set({ authorization: token })
    .send({})
    .expect(200);
  expect(response.body).toEqual(true);
});
it('should return 200  and 10 employees', async () => {
  const response = await request(app)
    .get('/employee')
    .query({ skip: 1, limit: 3 })
    .set({ authorization: token })
    .send({})
    .expect(200);

  expect(response.body.length).toEqual(3);
});
