import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Role } from '../../entities/role.entity';
import { UserRole } from '../../interfaces/UserRole.enum';

export default class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const roleFactory = factoryManager.get(Role);

    await roleFactory.save({ name: UserRole.Patient });
    await roleFactory.save({ name: UserRole.Psychologist });
  }
}
