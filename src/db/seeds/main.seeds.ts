import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Token } from '../../entities/token.entity';

export default class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const userFactory = factoryManager.get(User);
    const tokenFactory = factoryManager.get(Token);

    const users = await userFactory.saveMany(2);

    await Promise.all(
      users.map(async (user) => {
        await tokenFactory.saveMany(1, { user: user });
        return;
      }),
    );
  }
}
