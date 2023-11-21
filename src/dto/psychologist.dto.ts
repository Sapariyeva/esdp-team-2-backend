import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsString, IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';

export class PsychologistDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @Expose()
  @IsEnum(['online', 'offline'], { message: 'Выберете онлайн или офлайн!' })
  format!: 'online' | 'offline';

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNumber()
  @Min(0, { message: 'Cost must be greater than or equal to 0' })
  cost!: number;

  @Expose()
  @IsEnum(['male', 'female'], { message: 'Выберете male или female!' })
  gender!: 'male' | 'female';

  @Expose()
  @Transform(({ value }) => (value === '' ? null : value))
  @IsOptional()
  @IsString()
  video!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  photo!: string;

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNumber()
  @Min(0, { message: 'Experience Years must be greater than or equal to 0' })
  experienceYears!: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  education!: string;

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNumber()
  @Min(0, { message: 'Выбран не валидный город!' })
  cityId!: number;

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNumber()
  @Min(0, { message: 'Не валидный пользователь' })
  userId!: number;
}
