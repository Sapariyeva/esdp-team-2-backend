import { ICertificate } from './ICertificate.interface';
import { IUser } from './IUser.interface';
import { ICity } from './ICity.interface';
import { IPhoto } from './IPhoto.interface';

export interface IPsychologist {
  id: number;
  fullName: string;
  gender: 'male' | 'female';
  birthDay: Date;
  address: string;
  description: string;
  video: string | null;
  experienceYears: number;
  languages: string;
  education: string;
  format: 'online' | 'offline';
  cost: number;
  consultationType: string;
  selfTherapy: string;
  lgbt: boolean;
  isPublish: boolean;
  userId: number;
  user?: IUser;
  certificates?: ICertificate[];
  city?: ICity;
  cityId: number;
  photo: IPhoto[];
}
