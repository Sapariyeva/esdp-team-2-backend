export interface IPatient {
  id: number;
  email: string | null;
  phone: string | null;
  role: 'patient';
  password: string;
  name: string;
}

export interface IPatientTokenData extends IPatient {
  refreshToken: string;
  accessToken: string;
}
