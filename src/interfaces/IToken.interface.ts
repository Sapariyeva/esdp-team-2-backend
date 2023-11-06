import { IUser } from './IUser.interface';

export interface IToken {
  id: number;
  refresh_token?: string;
  user: IUser;
}
