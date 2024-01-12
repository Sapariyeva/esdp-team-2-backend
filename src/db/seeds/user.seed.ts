import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../../entities/user.entity';
import { Role } from '../../entities/role.entity';
import { UserRole } from '../../interfaces/UserRole.enum';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const roles: Role[] = await dataSource.getRepository(Role).find();
    if (!roles.length) throw new Error('Не удалось получить роли для пользователей');

    const userFactory = factoryManager.get(User);

    const userPromises: Promise<User[]>[] = roles.map(async (role) => {
      if (role.name === UserRole.Admin) {
        return await userFactory.saveMany(1, { username: 'admin', email: undefined, isActivated: true, roles: [role] });
      }

      let amount: number = 0;
      if (role.name === UserRole.Psychologist) amount = 1;
      if (role.name === UserRole.Patient) amount = 1;

      return await userFactory.saveMany(amount, { roles: [role] });
    });

    await Promise.all(userPromises);
  }
}
