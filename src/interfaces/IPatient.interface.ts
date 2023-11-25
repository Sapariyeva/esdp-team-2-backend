import { IUser } from './IUser.interface';
import { IPsychologist } from './IPsychologist.interface';

export interface IPatient {
  id: number;
  name: string;
  userId: number;
  user?: IUser;
  favorites?: IPsychologist[];
}
