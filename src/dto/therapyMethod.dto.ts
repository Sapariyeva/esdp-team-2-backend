import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
export class TherapyMethodDto {
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Поле name обязательное' })
  name!: string;
}
