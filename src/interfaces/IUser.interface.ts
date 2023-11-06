export interface IUser {
  id: number;
  username?: string;
  email: string;
  phone: string;
  date_of_birth: Date;
  password: string;
  role: 'admin' | 'patient' | 'psychologist';
}
