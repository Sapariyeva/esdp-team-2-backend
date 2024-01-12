import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Patient } from '../../entities/patient.entity';

export const PatientFactory = setSeederFactory(Patient, (faker: Faker) => {
  const patient = new Patient();
  patient.name = faker.person.firstName();
  return patient;
});
