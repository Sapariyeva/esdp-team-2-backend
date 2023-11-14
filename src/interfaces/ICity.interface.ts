import { IPsychologist } from './IPsychologist.interface';

export interface ICity {
  id: number;
  name: string;
  psychologists?: IPsychologist[];
}
