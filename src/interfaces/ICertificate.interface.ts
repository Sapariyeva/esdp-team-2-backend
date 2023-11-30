import { IPsychologist } from './IPsychologist.interface';

export interface ICertificate {
  id: number;
  certificate: string;
  psychologistId: number;
  psychologist?: IPsychologist;
}
