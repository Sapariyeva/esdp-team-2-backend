import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class UserRequestPasswordForgotDto {
  @Expose()
  @IsEmail({}, { message: 'Введите действительный адрес электронной почты' })
  email!: string;
}
