import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsString, IsNumber, Min, IsOptional, IsDate, IsBoolean } from 'class-validator';

export class RecordDto {
  @Expose()
  @IsEnum(['online', 'offline'], { message: 'Выберете онлайн или офлайн!' })
  format!: 'online' | 'offline';

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNumber()
  cost!: number;

  @Expose()
  @IsString()
  @IsOptional()
  address!: string;

  @Expose()
  @IsNumber()
  duration!: number;

  @Expose()
  @IsString()
  @IsOptional()
  broadcast!: string;

  @Expose()
  @IsBoolean()
  @IsOptional()
  isCanceled!: boolean;

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNumber()
  @Min(0, { message: 'Выбран не валидный город!' })
  cityId!: number;

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNumber()
  @Min(0, { message: 'Не валидный пациент' })
  patientId!: number;

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNumber()
  @Min(0, { message: 'Не валидный психолог' })
  psychologistId!: number;

  @Expose()
  @IsDate()
  datetime!: Date;
}
