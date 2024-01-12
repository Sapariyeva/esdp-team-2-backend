import { Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../interfaces/UserRole.enum';

export class UserLoginRequest {
  @Expose()
  @IsEmail({}, { message: 'Введите действительный адрес электронной почты' })
  email!: string;

  @Expose()
  @IsNotEmpty({ message: 'Поле password не может быть пустым' })
  @IsString()
  password!: string;

  @Expose()
  @IsString()
  @IsEnum(UserRole)
  role!: UserRole;
}
