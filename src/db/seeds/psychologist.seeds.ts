import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../../entities/user.entity';
import { UserRole } from '../../interfaces/UserRole.enum';
import { Psychologist } from '../../entities/psychologist.entity';
import { City } from '../../entities/city.entity';
import { TherapyMethod } from '../../entities/therapyMethod.entity';
import { Technique } from '../../entities/technique.entity';
import { Symptom } from '../../entities/symptom.entity';
import { faker } from '@faker-js/faker';

interface IPsychologistSkills {
  therapyMethods: TherapyMethod[];
  techniques: Technique[];
  symptoms: Symptom[];
}

export default class PsychologistSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    try {
      const users: User[] = await this.getUserPsychologists(dataSource);
      const cities: City[] = await this.getCities(dataSource);
      const { therapyMethods, techniques, symptoms }: IPsychologistSkills = await this.getSkills(dataSource);

      const psychologistFactory = factoryManager.get(Psychologist);
      await Promise.all(
        users.map(async (user) => {
          const selectedTherapyMethods: TherapyMethod[] = faker.helpers.arrayElements(
            therapyMethods,
            faker.number.int({ min: 1, max: therapyMethods.length > 5 ? 5 : therapyMethods.length }),
          );
          const selectedTechniques: Technique[] = faker.helpers.arrayElements(
            techniques,
            faker.number.int({ min: 1, max: techniques.length > 3 ? 3 : techniques.length }),
          );
          const selectedSymptoms: Symptom[] = faker.helpers.arrayElements(
            symptoms,
            faker.number.int({ min: 1, max: symptoms.length > 8 ? 8 : symptoms.length }),
          );

          return await psychologistFactory.save({
            user,
            city: faker.helpers.arrayElement(cities),
            therapyMethods: selectedTherapyMethods,
            techniques: selectedTechniques,
            symptoms: selectedSymptoms,
          });
        }),
      );
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
      else console.error('Неизвестная ошибка');

      throw new Error('Не удалось создать сиды психологов');
    }
  }

  private async getUserPsychologists(dataSource: DataSource): Promise<User[]> {
    const users: User[] = await dataSource
      .getRepository(User)
      .find({ relations: { roles: true }, where: { roles: { name: UserRole.Psychologist } } });
    if (!users.length) throw new Error('Не удалось получить пользователей психологов');

    return users;
  }

  private async getCities(dataSource: DataSource): Promise<City[]> {
    const cities: City[] = await dataSource.getRepository(City).find();
    if (!cities.length) throw new Error('Не удалось получить города');

    return cities;
  }

  private async getSkills(dataSource: DataSource): Promise<IPsychologistSkills> {
    const therapyMethods: TherapyMethod[] = await dataSource.getRepository(TherapyMethod).find();
    if (!therapyMethods.length) throw new Error('Не удалось получить методы терапии');

    const techniques: Technique[] = await dataSource.getRepository(Technique).find();
    if (!therapyMethods.length) throw new Error('Не удалось получить техники');

    const symptoms: Symptom[] = await dataSource.getRepository(Symptom).find();
    if (!therapyMethods.length) throw new Error('Не удалось получить симптомы');

    return { therapyMethods, techniques, symptoms };
  }
}
