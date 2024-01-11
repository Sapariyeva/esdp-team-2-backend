import { Expose, Transform } from 'class-transformer';
import { IsNumber, Min, IsOptional, IsBoolean, IsString, IsEnum } from 'class-validator';

export class RecordDto {
  @Expose()
  @IsBoolean()
  @IsOptional()
  isCanceled!: boolean;

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNumber()
  @Min(0, { message: 'Не валидный cлот' })
  slotId!: number;

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
  @IsString()
  datetime!: string;

  @Expose()
  @IsString()
  patientName!: string;

  @Expose()
  @IsOptional()
  @IsEnum(['online', 'offline'], { message: 'Выберите формат' })
  format!: 'online' | 'offline';

  @Expose()
  @IsOptional()
  @IsString()
  comment!: string;
}
