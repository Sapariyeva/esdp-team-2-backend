import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class PatientDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name!: string;
}
