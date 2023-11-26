import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { IPsychologist } from '../interfaces/IPsychologist.interface';
export class TherapyMethodDto {
  @Expose()
  id?: number;

  @Expose()
  @IsNotEmpty({ message: 'Поле name обязательное' })
  name!: string;

  @Expose()
  psychologist?: IPsychologist;
}
