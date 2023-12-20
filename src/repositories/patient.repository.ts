import { FindOptionsWhere, Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { IPatient } from '../interfaces/IPatient.interface';
import { Patient } from '../entities/patient.entity';
import { PatientDto } from '../dto/patient.dto';
import { IPsychologist } from '../interfaces/IPsychologist.interface';
import { IViewedPsychologist } from '../interfaces/IViewedPsychologist';
import { ViewedPsychologists } from '../entities/viewedPsychologists.entity';

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
  async getPatientWithLastPsychologists(where: FindOptionsWhere<Patient>): Promise<IPatient | null> {
    return await this.findOne({
      where,
      relations: { lastViewedPsychologists: true },
      order: { lastViewedPsychologists: { addedAt: 'DESC' } },
    });
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
    return await this.findOne({ where, relations: { favorites: true } });
  };
  async updateViewedPsychologists(patient: IPatient, newPsychologist: IPsychologist): Promise<IViewedPsychologist[]> {
    if (!patient.lastViewedPsychologists) {
      patient.lastViewedPsychologists = [];
    }

    const existingPsychologistIndex = patient.lastViewedPsychologists.findIndex((ps) => ps.psychologistId === newPsychologist.id);
    if (existingPsychologistIndex !== -1) {
      const existingPsychologist = patient.lastViewedPsychologists[existingPsychologistIndex];
      patient.lastViewedPsychologists.splice(existingPsychologistIndex, 1);
      await this.manager.getRepository(ViewedPsychologists).delete(existingPsychologist.id);
    }

    const newViewedPsychologist = new ViewedPsychologists();
    newViewedPsychologist.patientId = patient.id;
    newViewedPsychologist.psychologistId = newPsychologist.id;
    patient.lastViewedPsychologists.push(newViewedPsychologist);

    while (patient.lastViewedPsychologists.length > 5) {
      const oldestPsychologist = patient.lastViewedPsychologists.pop();
      if (oldestPsychologist) {
        await this.manager.getRepository(ViewedPsychologists).delete(oldestPsychologist.id);
      }
    }

    await this.save(patient);

    return patient.lastViewedPsychologists;
  }
}
