import { IPatient } from './IPatient.interface';

export interface IPatientToken {
  id: number;
  refreshToken: string;
  patientId: number;
  patient?: IPatient;
}
