import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Patient } from '../../entities/patient.entity';

export const UserFactory = setSeederFactory(Patient, (faker: Faker) => {
  const user = new Patient();
  user.email = faker.internet.email();
  user.phone = faker.phone.number();
  user.password = '123456';
  user.hashPassword();
  return user;
});
