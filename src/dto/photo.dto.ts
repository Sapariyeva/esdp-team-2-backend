import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class PhotoDto {
  @Expose()
  @IsNotEmpty({ message: 'Поле photo обязательное' })
  photo!: string;
}
