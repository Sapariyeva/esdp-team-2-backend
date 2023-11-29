import { FindOptionsWhere, Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { IPatient } from '../interfaces/IPatient.interface';
import { Patient } from '../entities/patient.entity';
import { PatientDto } from '../dto/patient.dto';
import { IPsychologist } from '../interfaces/IPsychologist.interface';

export class PatientRepository extends Repository<IPatient> {
  constructor() {
    super(Patient, appDataSource.createEntityManager());
  }
  async createPatient(dto: PatientDto): Promise<IPatient> {
    const patient = this.create(dto);
    return await this.save(patient);
  }
  async deletePatient(id: number) {
    const deletedPatient = await this.delete(id);
    if (deletedPatient.affected) return id;
    return null;
  }
  async getPatients(): Promise<IPatient[]> {
    return await this.find();
  }
  async getPatient(id: number): Promise<IPatient | null> {
    return await this.findOne({ where: { id }, relations: { favorites: true } });
  }
  async editPatient(patient: IPatient, dto: PatientDto): Promise<IPatient | null> {
    const updatedPatient = this.merge(patient, dto);
    return await this.save(updatedPatient);
  }
  async changeToFavorites(patient: IPatient, psychologist: IPsychologist): Promise<IPsychologist[] | undefined> {
    const isAlreadyAdded = patient.favorites?.some((fav) => fav.id === psychologist.id);
    if (!isAlreadyAdded) {
      patient.favorites = [...(patient.favorites || []), psychologist];
    } else {
      patient.favorites = (patient.favorites || []).filter((fav) => fav.id !== psychologist.id);
    }
    this.save(patient);
    if (patient.favorites) {
      return patient.favorites;
    } else return;
  }
  public findOnePatient = async (where: FindOptionsWhere<Patient>): Promise<IPatient | null> => {
    return await this.findOne({ where });
  };
}
