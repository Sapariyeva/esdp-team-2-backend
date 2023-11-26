import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
export class TechniqueDto {
  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Поле name обязательное' })
  name!: string;
}
