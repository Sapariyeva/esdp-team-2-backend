import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../entities/user.entity';

export const UserFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();
  user.email = faker.internet.email();
  user.password = '123456';
  user.refreshToken = user.generateRefreshToken();
  return user;
});
