import { Expose, Transform } from 'class-transformer';
import { IsEnum, Min, IsBoolean, IsOptional } from 'class-validator';
import validateNumber from '../helpers/validateNumber';

export class FiltersOfPsychologistDto {
  @Expose()
  @IsOptional()
  @IsEnum(['male', 'female'], { message: 'Выберите пол!' })
  gender!: 'male' | 'female';

  @Expose()
  @IsOptional()
  age!: number | number[];

  @Expose()
  @IsOptional()
  @IsEnum(['kazakh', 'russian', 'english'], { message: 'Выберите подходящий язык с списка!' })
  languages!: 'kazakh' | 'russian' | 'english';

  @Expose()
  @IsOptional()
  @IsEnum(['online', 'offline'], { message: 'Выберите формат онлайн или офлайн!' })
  format!: 'online' | 'offline';

  @Expose()
  @IsOptional()
  cost!: number[];

  @Expose()
  @IsOptional()
  @IsEnum(['solo', 'duo', 'group', 'children'], { message: 'Выберите формат дуо или соло!' })
  consultationType!: 'solo' | 'duo';

  @Expose()
  @IsOptional()
  @Transform(({ value }) => !!(typeof value === 'string' ? parseInt(value) : value))
  @IsBoolean({ message: 'Значение поля lgbt должно быть логическим значением' })
  lgbt!: boolean;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @Min(1, { message: 'Неверный формат идентификатора города' })
  cityId!: number;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) && value.map((number) => validateNumber(number)))
  symptomIds!: number[];

  @Expose()
  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) && value.map((number) => validateNumber(number)))
  therapyMethodIds!: number[];

  @Expose()
  @IsOptional()
  @Transform(({ value }) => Array.isArray(value) && value.map((number) => validateNumber(number)))
  techniqueIds!: number[];
}
