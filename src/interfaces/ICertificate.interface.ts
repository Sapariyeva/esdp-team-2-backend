import { IPsychologist } from './IPsychologist.interface';

export interface ICertificate {
  id: number;
  sertificate: string;
  psychologistId: number;
  psychologist?: IPsychologist;
}
