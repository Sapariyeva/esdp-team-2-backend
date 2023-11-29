import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsEnum, IsString, IsNotEmpty, IsNumber, Min, IsDate, IsBoolean, IsOptional } from 'class-validator';
import { IPsychologist } from '../interfaces/IPsychologist.interface';

@Exclude()
export class PsychologistDto implements IPsychologist {
  @Expose()
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @Expose()
  @IsNotEmpty()
  @IsEnum(['male', 'female'], { message: 'Выберите пол!' })
  gender!: 'male' | 'female';

  @Expose()
  @IsNotEmpty({ message: 'Введите дату рождения.' })
  @Transform(({ value }) => (typeof value === 'string' ? new Date(value) : value))
  @IsDate()
  birthday!: Date;

  @Expose()
  @IsNotEmpty()
  @IsString()
  address!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @Expose()
  @Transform(({ value }) => (value === '' ? null : value))
  @IsNotEmpty()
  @IsString()
  video!: string;

  @Expose()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNumber()
  @Min(0, { message: 'Количество лет опыта должно быть больше или равно 0' })
  experienceYears!: number;

  @Expose()
  @IsNotEmpty()
  @IsEnum(['kazakh', 'russian', 'english'], { message: 'Выберите подходящий язык с списка!', each: true })
  languages!: 'kazakh' | 'russian' | 'english';

  @Expose()
  @IsNotEmpty({ message: 'Значение поля "образование" не может быть пустым' })
  @IsString({ message: 'Значение поля "образование" должно быть строкой' })
  education!: string;

  @Expose()
  @IsNotEmpty()
  @IsEnum(['online', 'offline'], { message: 'Выберите формат онлайн или офлайн!' })
  format!: 'online' | 'offline';

  @Expose()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNumber()
  @Min(0, { message: 'Стоимость должна быть больше или равна 0' })
  cost!: number;

  @Expose()
  @IsNotEmpty()
  @IsEnum(['solo', 'duo'], { message: 'Выберите формат дуо или соло!' })
  consultationType!: 'solo' | 'duo';

  @Expose()
  @IsNotEmpty({ message: 'Поле личная терапия не может быть пустым' })
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  selfTherapy!: number;

  @Expose()
  @IsOptional()
  @IsBoolean({ message: 'Значение поля lgbt должно быть логическим значением' })
  @Type(() => Boolean)
  lgbt!: boolean;

  @Expose()
  @IsNotEmpty({ message: 'Город не может быть пустым' })
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @Min(1, { message: 'Неверный формат идентификатора города' })
  cityId!: number;

  @Expose()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNumber()
  @Min(0, { message: 'Неверный user id' })
  userId!: number;

  @Exclude()
  id!: number;
}
