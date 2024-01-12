import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';
export class TechniqueDto {
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Поле name обязательное' })
  @Length(1, 200)
  name!: string;
}
