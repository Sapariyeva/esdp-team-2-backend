import { Expose, Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, ValidateIf } from 'class-validator';
import { IsExistEmailOrPhone } from '../validators/IsExistEmailOrPhone';
import { UserRole } from '../interfaces/UserRole.enum';

export class AuthUserDto {
  @Expose()
  @IsString()
  @IsOptional()
  name!: string;

  @Expose()
  @IsEmail({}, { message: 'Введите действительный адрес электронной почты' })
  @ValidateIf((o) => o.phone === null || o.phone === undefined)
  @Transform(({ value }) => (value === '' ? null : value))
  @IsExistEmailOrPhone('phone', { message: 'Одно из полей email или phone должно быть заполнено!' })
  email?: string;

  @Expose()
  @IsPhoneNumber('KZ', { message: 'Пожалуйста, предоставьте правильный номер телефона' })
  @ValidateIf((o) => o.email === null || o.email === undefined)
  @Transform(({ value }) => (value === '' || value === undefined ? null : value))
  @IsExistEmailOrPhone('email', { message: 'Одно из полей email или phone должно быть заполнено!' })
  phone?: string;

  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Поле password обязательное' })
  password!: string;

  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Поле password обязательное' })
  role!: UserRole;
}
