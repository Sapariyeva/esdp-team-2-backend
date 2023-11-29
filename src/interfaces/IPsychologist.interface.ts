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
  birthday: Date;
  address: string;
  description: string;
  video: string | null;
  experienceYears: number;
  languages: 'kazakh' | 'russian' | 'english';
  education: string;
  format: 'online' | 'offline';
  cost: number;
  consultationType: 'solo' | 'duo';
  selfTherapy: number;
  lgbt: boolean;
  isPublish?: boolean;
  userId: number;
  user?: IUser;
  certificates?: ICertificate[];
  city?: ICity;
  cityId: number;
  photos?: IPhoto[];
  techniques?: ITechnique[];
  therapyMethod?: ITherapyMethod[];
  symptoms?: ISymptom[];
}
