import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Technique } from '../../entities/technique.entity';

export default class TechniqueSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const techniqueFactory = factoryManager.get(Technique);
    await techniqueFactory.saveMany(6);
  }
}
