import { ICertificate } from './ICertificate.interface';
import { IUser } from './IUser.interface';
import { ICity } from './ICity.interface';
import { IPhoto } from './IPhoto.interface';
import { ITechnique } from './ITechnique.interface';
import { ITherapyMethod } from './ITherapyMethod.interface';
import { ISymptom } from './ISymptom.interface';

interface IPsychologistDataOnly {
  id: number;
  fullName: string;
  gender: 'male' | 'female';
  birthday: Date;
  address: string;
  description: string;
  video: string | null;
  experienceYears: number;
  languages: string[];
  education: string;
  format: 'online' | 'offline';
  cost: number;
  consultationType: 'solo' | 'duo';
  selfTherapy: number;
  lgbt: boolean;
  isPublish: boolean;
  userId: number;
  cityId: number;
}

interface IPsychologistNewDataOnly extends Omit<IPsychologistDataOnly, 'id' | 'isPublish'> {}

interface IPsychologistRelations {
  user: IUser;
  city: ICity;
  certificates: ICertificate[];
  photos: IPhoto[];
  therapyMethods: ITherapyMethod[];
  techniques: ITechnique[];
  symptoms: ISymptom[];
}

export interface IPsychologist extends IPsychologistDataOnly, Partial<IPsychologistRelations> {}

export interface IPsychologistNewData extends IPsychologistNewDataOnly, Pick<IPsychologistRelations, 'symptoms' | 'techniques' | 'therapyMethods'> {}

export interface IPsychologistClientData extends IPsychologistNewDataOnly {
  therapyMethodIds: number[];
  techniqueIds: number[];
  symptomIds: number[];
}
