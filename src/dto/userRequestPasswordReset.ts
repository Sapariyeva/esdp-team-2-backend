import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserRequestPasswordResetDto {
  @Expose()
  @IsNotEmpty({ message: 'Поле password обязательное' })
  @IsString()
  password!: string;
}
