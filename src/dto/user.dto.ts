import { Expose, instanceToPlain, Transform } from 'class-transformer';
import { Role } from '../entities/role.entity';
import { IPsychologist } from '../interfaces/IPsychologist.interface';
import { IPatient } from '../interfaces/IPatient.interface';
export class UserDto {
  @Expose()
  id?: number;

  @Expose()
  email?: string;

  @Expose()
  phone?: string;

  @Expose()
  name!: string;

  @Expose()
  role!: Role[];

  @Expose()
  @Transform((value) => instanceToPlain(value.obj.psychologist))
  psychologist!: IPsychologist;

  @Expose()
  @Transform((value) => instanceToPlain(value.obj.patient))
  patient!: IPatient;

  @Expose()
  accessToken!: string;

  @Expose()
  isActivated!: boolean;
}
