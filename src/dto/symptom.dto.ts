import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class SymptomDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  name!: string;
}
