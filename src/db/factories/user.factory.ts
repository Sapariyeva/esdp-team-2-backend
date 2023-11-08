import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../entities/user.entity';

export const UserFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();
  user.date_of_birth = faker.date.anytime();
  user.email = faker.internet.email();
  user.phone = faker.phone.number();
  user.password = '123456';
  user.hashPassword();
  return user;
});
