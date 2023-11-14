import { IPatient } from './IPatient.interface';
import { IPsychologist } from './IPsychologist.interface';
import { UserRole } from './UserRole.enum';

export interface IUser {
  id: number;
  username: string | null;
  email: string | null;
  phone: string | null;
  password: string;
  refreshToken: string;
  roles?: UserRole[];
  patient?: IPatient | null;
  psychologist?: IPsychologist | null;
}

export interface IUserTokenData extends IUser {
  refreshToken: string;
  accessToken: string;
}
