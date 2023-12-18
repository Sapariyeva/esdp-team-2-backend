import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsString, IsNotEmpty, IsNumber, Min, IsDate, IsBoolean, IsPositive, IsOptional, IsArray } from 'class-validator';
import { IPsychologistClientData } from '../interfaces/IPsychologist.interface';
import validateNumber from '../helpers/validateNumber';
import { ELanguages } from '../enum/ELanguages';
import { EFormat } from '../enum/EFormat';
import { EConsultationType } from '../enum/EConsultationType';
import getEnumValues from '../helpers/getEnumValues';
import { EGender } from '../enum/EGender';

const messages = {
  isNotEmpty: 'Поле не может быть пустым',
  isString: 'Поле должно быть строкой',
  isNumber: 'Поле должно быть числом',
  isPositive: 'Поле должно быть положительным числом',
  isNumberArray: 'Значения в массиве должны быть числом',
  isPositiveArray: 'Значения в массиве должны быть положительным числом',
  min: (minNumber: number): string => `Поле должно содержать значение минимум ${minNumber}`,
  isArray: 'Поле должно быть массивом',
  isBoolean: 'Поле должно быть логическим значением',
  isEnum: (enumObj: Record<string, string>, each: boolean = false): string => {
    let message = 'Поле должно содержать только значения:';
    if (each) message = 'Значения в массиве должны содержать только значения:';

    return `${message} ${getEnumValues(enumObj)}`;
  },
  isDate: 'Поле должно быть датой',
};

export class PsychologistDto implements IPsychologistClientData {
  @Expose()
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsString({ message: messages.isString })
  fullName!: string;

  @Expose()
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsString({ message: messages.isString })
  @IsEnum(EGender, { message: messages.isEnum(EGender) })
  gender!: EGender;

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? new Date(value) : value))
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsDate({ message: messages.isDate })
  birthday!: Date;

  @Expose()
  @Transform(({ value }) => (value === '' ? null : value))
  @IsOptional()
  @IsString({ message: messages.isString })
  address!: string;

  @Expose()
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsString({ message: messages.isString })
  description!: string;

  @Expose()
  @Transform(({ value }) => (value === '' ? null : value))
  @IsOptional()
  @IsString({ message: messages.isString })
  video!: string | null;

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsNumber({}, { message: messages.isNumber })
  @Min(0, { message: messages.min(0) })
  experienceYears!: number;

  @Expose()
  @Transform(({ value }) => {
    if (!value) {
      return [];
    }

    return Array.isArray(value) ? [...new Set(value)] : [value];
  })
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsArray({ message: messages.isArray })
  @IsEnum(ELanguages, { each: true, message: messages.isEnum(ELanguages, true) })
  languages!: ELanguages[];

  @Expose()
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsString({ message: messages.isString })
  education!: string;

  @Expose()
  @Transform(({ value }) => {
    if (!value) {
      return [];
    }

    return Array.isArray(value) ? [...new Set(value)] : [value];
  })
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsArray({ message: messages.isArray })
  @IsEnum(EFormat, { each: true, message: messages.isEnum(EFormat, true) })
  format!: EFormat[];

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsNumber({}, { message: messages.isNumber })
  @Min(0, { message: messages.min(0) })
  cost!: number;

  @Expose()
  @Transform(({ value }) => {
    if (!value) {
      return [];
    }

    return Array.isArray(value) ? [...new Set(value)] : [value];
  })
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsArray({ message: messages.isArray })
  @IsEnum(EConsultationType, { each: true, message: messages.isEnum(EConsultationType, true) })
  consultationType!: EConsultationType[];

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsNumber({}, { message: messages.isNumber })
  @Min(0, { message: messages.min(0) })
  selfTherapy!: number;

  @Expose()
  @Transform(({ value }) => !!(typeof value === 'string' ? parseInt(value) : value))
  @IsBoolean({ message: messages.isBoolean })
  lgbt!: boolean;

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNotEmpty({ message: messages.isNotEmpty })
  @Min(1, { message: messages.isPositive })
  cityId!: number;

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsNumber({}, { message: messages.isNumber })
  @Min(1, { message: messages.isPositive })
  userId!: number;

  @Expose()
  @Transform(({ value }) => Array.isArray(value) && value.map((number) => validateNumber(number)))
  @IsArray({ message: messages.isArray })
  @IsNumber({}, { each: true, message: messages.isNumberArray })
  @IsPositive({ each: true, message: messages.isPositiveArray })
  symptomIds!: number[];

  @Expose()
  @Transform(({ value }) => Array.isArray(value) && value.map((number) => validateNumber(number)))
  @IsArray({ message: messages.isArray })
  @IsNumber({}, { each: true, message: messages.isNumberArray })
  @IsPositive({ each: true, message: messages.isPositiveArray })
  therapyMethodIds!: number[];

  @Expose()
  @Transform(({ value }) => Array.isArray(value) && value.map((number) => validateNumber(number)))
  @IsArray({ message: messages.isArray })
  @IsNumber({}, { each: true, message: messages.isNumberArray })
  @IsPositive({ each: true, message: messages.isPositiveArray })
  techniqueIds!: number[];
}
