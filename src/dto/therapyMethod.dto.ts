import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';
export class TherapyMethodDto {
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Поле name обязательное' })
  @Length(1, 200)
  name!: string;
}
