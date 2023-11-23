import { IUser } from './IUser.interface';

export interface IPatient {
  id: number;
  name: string;
  userId: number;
  user?: IUser;
}
