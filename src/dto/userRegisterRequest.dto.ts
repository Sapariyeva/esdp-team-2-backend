import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserRegisterRequestDto {
  @Expose()
  @IsEmail({}, { message: 'Введите действительный адрес электронной почты' })
  email!: string;

  @Expose()
  @IsNotEmpty({ message: 'Поле password обязательное' })
  @IsString()
  password!: string;
}
