import { IPsychologist } from './IPsychologist.interface';

export interface IViewedPsychologist {
  id: number;
  patientId: number;
  psychologistId: number;
  psychologist?: IPsychologist;
  addedAt?: Date;
}
