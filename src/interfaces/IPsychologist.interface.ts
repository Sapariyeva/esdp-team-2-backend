import ICity from './ICity.interface';

interface IPsychologist {
  id: number;
  email: string | null;
  phone: string | null;
  role: 'psychologist' | 'psychologist-admin';
  password: string;
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
  cityId: number;
  city?: ICity;
}

export default IPsychologist;
