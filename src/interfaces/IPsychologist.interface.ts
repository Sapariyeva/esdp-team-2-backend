import { ICertificate } from './ICertificate.interface';
import { IUser } from './IUser.interface';
import { ICity } from './ICity.interface';
import { IPhoto } from './IPhoto.interface';
import { ITechnique } from './ITechnique.interface';
import { ITherapyMethod } from './ITherapyMethod.interface';
import { ISymptom } from './ISymptom.interface';

export interface IPsychologist {
  id: number;
  fullName: string;
  gender: 'male' | 'female';
  birthDay: Date;
  address: string;
  description: string;
  video: string | null;
  experienceYears: number;
  languages: 'Kazakh' | 'Russia | English';
  education: string;
  format: 'online' | 'offline';
  cost: number;
  consultationType: 'solo' | 'duo';
  selfTherapy: number;
  lgbt: boolean;
  isPublish: boolean;
  userId: number;
  user?: IUser;
  certificates?: ICertificate[];
  city?: ICity;
  cityId: number;
  photo?: IPhoto[];
  techniques?: ITechnique[];
  therapyMethod?: ITherapyMethod[];
  symptoms?: ISymptom[];
}
