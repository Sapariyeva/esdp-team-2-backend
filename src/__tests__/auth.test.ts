import request from 'supertest';
import app from '../index';
import DtoManager from '../helpers/dtoManager';
import { UserDto } from '../dto/user.dto';
describe('auth', () => {
  test('POST /register/patient endpoint', async () => {
    const registrationPayload = {
      email: 'asdas1asdяt@gmail.com',
      password: '123456',
      name: 'nail',
    };

    const response = await request(app.app).post('/auth/register/patient').send(registrationPayload);
    expect(response.status).toBe(200);
    const { errors } = await DtoManager.createDto(UserDto, response.body, { isValidate: true });
    expect(errors.length).toBe(1);
  });
});
