import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../../entities/user.entity';
import { Role } from '../../entities/role.entity';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const roles: Role[] = await dataSource.getRepository(Role).find();
    if (!roles.length) throw new Error('Не удалось получить роли для пользователей');

    const userFactory = factoryManager.get(User);
    await Promise.all(roles.map(async (role) => await userFactory.saveMany(30, { roles: [role] })));
  }
}
