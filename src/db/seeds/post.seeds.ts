import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Post } from '../../entities/post.entity';

export default class PostSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const postFactory = factoryManager.get(Post);
    await postFactory.saveMany(25);
  }
}
