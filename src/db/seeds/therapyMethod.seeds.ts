import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { TherapyMethod } from '../../entities/therapyMethod.entity';

export default class TherapyMethodSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const therapyMethodFactory = factoryManager.get(TherapyMethod);
    await therapyMethodFactory.saveMany(11);
  }
}
