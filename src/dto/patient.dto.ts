import { Expose } from 'class-transformer';

export class PatientDto {
  @Expose()
  id?: number;

  @Expose()
  name?: string;

  @Expose()
  email?: string;

  @Expose()
  phone?: string;

  @Expose()
  role!: string;

  @Expose()
  accessToken!: string;
}
