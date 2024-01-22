import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { IChangePresenceStatus } from '../interfaces/ChangePresenceStatus.interface';

export class ChangePresenceStatusDto implements IChangePresenceStatus {
  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNumber({}, { message: 'Поле должно быть числом' })
  @Min(0, { message: 'Поле должно содержать значение минимум 1' })
  recordId!: number;

  @Expose()
  @IsOptional()
  @IsEnum(['patientAbsent', 'psychologistAbsent'], { message: 'Выберите роль' })
  role!: 'patientAbsent' | 'psychologistAbsent';
}
