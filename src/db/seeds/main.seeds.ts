import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Role } from '../../entities/role.entity';
import { UserRole } from '../../interfaces/UserRole.enum';
import { City } from '../../entities/city.entity';
import getKazakhstanCities from '../../api/cityApi';

export default class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const roleFactory = factoryManager.get(Role);
    const kazakhstanCities = await getKazakhstanCities();
    const cityRepository = dataSource.getRepository(City);

    await roleFactory.save({ name: UserRole.Patient });
    await roleFactory.save({ name: UserRole.Psychologist });

    await Promise.all(
      kazakhstanCities.map(async (cityData: { name: string }) => {
        const existingCity = await cityRepository.findOne({ where: { name: cityData.name } });

        if (!existingCity) {
          await cityRepository.save({ name: cityData.name });
        }
      }),
    );
  }
}
