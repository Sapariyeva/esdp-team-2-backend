import { Expose, Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class PatientDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNumber()
  @Min(0, { message: 'Не валидный пользователь' })
  userId!: number;
}
