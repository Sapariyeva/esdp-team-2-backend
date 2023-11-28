import { Expose } from 'class-transformer';
import { IsNotEmpty, IsInt } from 'class-validator';

export class PhotoDto {
  @Expose()
  @IsNotEmpty({ message: 'Поле photo обязательное' })
  photo!: string;

  @Expose()
  @IsInt({ message: 'Неверный формат psychologistId' })
  psychologistId!: number;
}
