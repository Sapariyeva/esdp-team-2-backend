import { Expose, Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, ValidateIf } from 'class-validator';
import { IsExistEmailOrPhone } from '../validators/IsExistEmailOrPhone';

export class SignInUserDto {
  @Expose()
  @IsEmail({}, { message: 'Введите действительный адрес электронной почты' })
  @ValidateIf((o) => o.phone === null)
  @Transform(({ value }) => (value === '' ? null : value))
  @IsExistEmailOrPhone('phone', { message: 'Одно из полей email или phone должно быть заполнено!' })
  email!: string;

  @Expose()
  @IsPhoneNumber('KZ', { message: 'Поле phone должно быть действительным номером телефона Казахстана' })
  @ValidateIf((o) => (o.email === null && typeof o.phone === 'string') || (typeof o.email === 'string' && typeof o.phone === 'string'))
  @Transform(({ value }) => (value === '' ? null : value))
  @IsExistEmailOrPhone('email', { message: 'Одно из полей email или phone должно быть заполнено!' })
  phone!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  password!: string;
}
