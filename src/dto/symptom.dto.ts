import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class SymptomDto {
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Поле name обязательное' })
  @Length(1, 200)
  name!: string;
}
