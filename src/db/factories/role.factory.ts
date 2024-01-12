import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Role } from '../../entities/role.entity';
import { UserRole } from '../../interfaces/UserRole.enum';

export const RoleFactory = setSeederFactory(Role, (faker: Faker, roleType: UserRole = UserRole.Patient) => {
  const role = new Role();
  role.name = roleType;
  return role;
});
