import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Role } from '../../entities/role.entity';
import { UserRole } from '../../interfaces/UserRole.enum';
import { City } from '../../entities/city.entity';
import { sortedCities } from '../../constants/cities';

export default class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const roleFactory = factoryManager.get(Role);
    const roles: Promise<Role>[] = Object.values(UserRole).map(async (roleName) => await roleFactory.save({ name: roleName }));
    await Promise.all(roles);

    const cityRepository = dataSource.getRepository(City);
    await Promise.all(sortedCities.map(async (cityData) => await cityRepository.save({ name: cityData.name })));
  }
}
