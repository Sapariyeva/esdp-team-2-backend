import { IPsychologist } from './IPsychologist.interface';

export interface IPhoto {
  id: number;
  photo: string;
  psychologistId: number;
  psychologist?: IPsychologist;
}
