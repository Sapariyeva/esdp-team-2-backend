export interface IUser {
  id: number;
  email: string;
  phone: string;
  date_of_birth: Date;
  password: string;
  role: 'user' | 'admin';
}

export interface IUserTokenData extends IUser {
  refreshToken: string;
  accessToken: string;
}
