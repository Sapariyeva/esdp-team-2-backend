import { ICity } from './ICity.interface';
import { IUser } from './IUser.interface';

export interface IPsychologist {
  id: number;
  fullName: string;
  format: 'online' | 'offline';
  cost: number;
  gender: 'male' | 'female';
  video: string;
  photo: string;
  experienceYears: number;
  description: string;
  education: string;
  isPublish: boolean;
  userId: number;
  user?: IUser;
  cityId: number;
  city?: ICity;
}
