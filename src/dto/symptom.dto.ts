import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class SymptomDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name!: string;
}
