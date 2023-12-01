import { Symptom } from '../../entities/symptom.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class SymptomsSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const symptomsFactory = factoryManager.get(Symptom);
    await symptomsFactory.saveMany(25);
  }
}
