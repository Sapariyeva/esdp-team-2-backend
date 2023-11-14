import { IUser } from './IUser.interface';
import { UserRole } from './UserRole.enum';

export interface IRole {
  id: number;
  name: UserRole;
  users?: IUser[];
}
