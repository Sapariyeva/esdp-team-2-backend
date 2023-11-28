import { Exclude, Expose, Transform } from 'class-transformer';
import { IsEnum, IsString, IsNotEmpty, IsNumber, Min, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { IPsychologist } from '../interfaces/IPsychologist.interface';

@Exclude()
export class PsychologistDto implements IPsychologist {
  @Expose()
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @Expose()
  @IsEnum(['male', 'female'], { message: 'Выберите пол!' })
  gender!: 'male' | 'female';

  @Expose()
  @IsDate()
  @IsNotEmpty()
  birthday!: Date;

  @Expose()
  @IsOptional()
  @IsString()
  address!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @Expose()
  @Transform(({ value }) => (value === '' ? null : value))
  @IsOptional()
  @IsString()
  video!: string;

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNumber()
  @Min(0, { message: 'Количество лет опыта должно быть больше или равно 0' })
  experienceYears!: number;

  @Expose()
  @IsEnum(['kazakh', 'russia', 'english'], { message: 'Выберите подходящий язык с списка!' })
  languages!: 'kazakh' | 'russia' | 'english';

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
  @IsNumber({}, { message: 'Значение поля "личная терапия" должно быть числом' })
  selfTherapy!: number;

  @Expose()
  @IsNotEmpty({ message: 'Значение поля lgbt не может быть пустым' })
  @IsBoolean()
  lgbt!: boolean;

  @Expose()
  @IsNotEmpty({ message: 'Город не может быть пустым' })
  @IsNumber({}, { message: 'Неверный формат идентификатора города' })
  @Min(1, { message: 'Идентификатор города должен быть больше 0' })
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
