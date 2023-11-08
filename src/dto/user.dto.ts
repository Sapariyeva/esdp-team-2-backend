import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id?: number;

  @Expose()
  username?: string;

  @Expose()
  email?: string;

  @Expose()
  phone?: string;

  @Expose()
  date_of_birth!: string;

  @Expose()
  role!: string;

  @Expose()
  accessToken!: string;
}
