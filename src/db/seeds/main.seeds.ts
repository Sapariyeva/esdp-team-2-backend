import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Patient } from '../../entities/patient.entity';
import { PatientToken } from '../../entities/patientToken.entity';

export default class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const userFactory = factoryManager.get(Patient);
    const tokenFactory = factoryManager.get(PatientToken);

    const users = await userFactory.saveMany(2);

    await Promise.all(
      users.map(async (patient) => {
        await tokenFactory.saveMany(1, { patient: patient });
        return;
      }),
    );
  }
}
