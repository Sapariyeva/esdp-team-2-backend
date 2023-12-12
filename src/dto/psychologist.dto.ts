import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsString, IsNotEmpty, IsNumber, Min, IsDate, IsBoolean, IsPositive, IsOptional, IsArray } from 'class-validator';
import { IPsychologistClientData } from '../interfaces/IPsychologist.interface';
import validateNumber from '../helpers/validateNumber';
import { ELanguages } from '../enum/ELanguages';
import { EFormat } from '../enum/EFormat';
import { EConsultationType } from '../enum/EConsultationType';

export class PsychologistDto implements IPsychologistClientData {
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
  @IsOptional()
  address!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @Expose()
  @Transform(({ value }) => (value === '' ? null : value))
  @IsOptional()
  @IsString()
  video!: string | null;

  @Expose()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNumber()
  @Min(0, { message: 'Количество лет опыта должно быть больше или равно 0' })
  experienceYears!: number;

  @Expose()
  @IsNotEmpty()
  @IsEnum(ELanguages, { each: true })
  @IsArray()
  @Transform(({ value }) => value.split(','))
  languages!: ELanguages[];

  @Expose()
  @IsNotEmpty({ message: 'Значение поля "образование" не может быть пустым' })
  @IsString({ message: 'Значение поля "образование" должно быть строкой' })
  education!: string;

  @Expose()
  @IsNotEmpty()
  @IsEnum(EFormat, { each: true })
  @IsArray()
  @Transform(({ value }) => value.split(','))
  format!: EFormat[];

  @Expose()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNumber()
  @Min(0, { message: 'Стоимость должна быть больше или равна 0' })
  cost!: number;

  @Expose()
  @IsNotEmpty()
  @IsEnum(EConsultationType, { each: true })
  @IsArray()
  @Transform(({ value }) => value.split(','))
  consultationType!: EConsultationType[];

  @Expose()
  @IsNotEmpty({ message: 'Поле личная терапия не может быть пустым' })
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  selfTherapy!: number;

  @Expose()
  @Transform(({ value }) => !!(typeof value === 'string' ? parseInt(value) : value))
  @IsBoolean({ message: 'Значение поля lgbt должно быть логическим значением' })
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

  @Expose()
  @Transform(({ value }) => Array.isArray(value) && value.map((number) => validateNumber(number)))
  @IsNumber({}, { each: true, message: 'Тип id симптома должен быть числом' })
  @IsPositive({ each: true, message: 'Id симптома должен быть положительным' })
  symptomIds!: number[];

  @Expose()
  @Transform(({ value }) => Array.isArray(value) && value.map((number) => validateNumber(number)))
  @IsNumber({}, { each: true, message: 'Тип id метода терапии должен быть числом' })
  @IsPositive({ each: true, message: 'Id метода терапии должен быть положительным' })
  therapyMethodIds!: number[];

  @Expose()
  @Transform(({ value }) => Array.isArray(value) && value.map((number) => validateNumber(number)))
  @IsNumber({}, { each: true, message: 'Тип id техники должен быть числом' })
  @IsPositive({ each: true, message: 'Id техники должен быть положительным' })
  techniqueIds!: number[];
}
