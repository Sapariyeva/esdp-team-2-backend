import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Role } from '../../entities/role.entity';
import { UserRole } from '../../interfaces/UserRole.enum';
import { City } from '../../entities/city.entity';
import getKazakhstanCities from '../../api/cityApi';

export default class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const roleFactory = factoryManager.get(Role);
    await roleFactory.save({ name: UserRole.Patient });
    await roleFactory.save({ name: UserRole.Psychologist });

    const kazakhstanCities = (await getKazakhstanCities()) as { name: string }[];
    const cityRepository = dataSource.getRepository(City);
    await Promise.all(kazakhstanCities.map(async (cityData) => await cityRepository.save({ name: cityData.name })));
  }
}
