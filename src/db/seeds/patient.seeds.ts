import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../../entities/user.entity';
import { UserRole } from '../../interfaces/UserRole.enum';
import { Patient } from '../../entities/patient.entity';
import { Psychologist } from '../../entities/psychologist.entity';
import { faker } from '@faker-js/faker';

export default class PatientSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    try {
      const users: User[] = await this.getUserPatients(dataSource);
      const psychologists: Psychologist[] = await this.getPsychologists(dataSource);

      const patientFactory = factoryManager.get(Patient);
      await Promise.all(
        users.map(async (user) => {
          const favorites: Psychologist[] = faker.helpers.arrayElements(
            psychologists,
            faker.number.int({ min: 1, max: psychologists.length > 8 ? 8 : psychologists.length }),
          );

          return await patientFactory.save({ user, favorites });
        }),
      );
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
      else console.error('Неизвестная ошибка');

      throw new Error('Не удалось создать сиды пациентов');
    }
  }

  private async getUserPatients(dataSource: DataSource): Promise<User[]> {
    const users: User[] = await dataSource.getRepository(User).find({ relations: { roles: true }, where: { roles: { name: UserRole.Patient } } });
    if (!users.length) throw new Error('Не удалось получить пользователей пациентов');

    return users;
  }

  private async getPsychologists(dataSource: DataSource): Promise<Psychologist[]> {
    const psychologists: Psychologist[] = await dataSource.getRepository(Psychologist).find();
    if (!psychologists.length) throw new Error('Не удалось получить психологов для избранного пациента');

    return psychologists;
  }
}
