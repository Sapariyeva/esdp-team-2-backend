import { PatientDto } from '../dto/patient.dto';
import { IPatient } from '../interfaces/IPatient.interface';
import { IPsychologist } from '../interfaces/IPsychologist.interface';
import { PatientRepository } from '../repositories/patient.repository';
import { UsersRepository } from '../repositories/users.repository';

export class PatientService {
  private repository: PatientRepository;
  private usersRepository: UsersRepository;

  constructor() {
    this.repository = new PatientRepository();
    this.usersRepository = new UsersRepository();
  }

  getPatients = async (): Promise<IPatient[]> => {
    return await this.repository.getPatients();
  };

  createPatient = async (dto: PatientDto): Promise<IPatient> => {
    return await this.repository.createPatient(dto);
  };

  getPatient = async (id: number): Promise<IPatient | null> => {
    return await this.repository.getPatient(id);
  };

  deletePatient = async (id: number) => {
    return await this.repository.deletePatient(id);
  };
  editPatient = async (patient: IPatient, dto: PatientDto) => {
    return await this.repository.editPatient(patient, dto);
  };
  changeToFavorites = async (patient: IPatient, psychologist: IPsychologist) => {
    return await this.repository.changeToFavorites(patient, psychologist);
  };
  checkUserExists = async (userId: number): Promise<boolean> => {
    const user = await this.usersRepository.findOneUser({ id: userId });
    return !!user;
  };
  isPatientCreatable = async (userId: number): Promise<boolean> => {
    const patient = await this.repository.findOnePatient({ userId });
    return !patient;
  };

  getPatientWithLastPsychologists = async (userId: number): Promise<IPatient | null> => {
    return await this.repository.getPatientWithLastPsychologists({ userId });
  };

  updateViewedPsychologists = async (patient: IPatient, Psychologist: IPsychologist) => {
    return await this.repository.updateViewedPsychologists(patient, Psychologist);
  };
}
