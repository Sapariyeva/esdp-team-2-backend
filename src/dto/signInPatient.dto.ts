import { Expose, Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, ValidateIf } from 'class-validator';
import { IsExistEmailOrPhone } from '../validators/IsExistEmailOrPhone';

export class SignInPatientDto {
  @Expose()
  @IsEmail({}, { message: 'Введите действительный адрес электронной почты' })
  @ValidateIf((o) => o.phone === null || o.phone.length < 0)
  @Transform(({ value }) => (value === '' ? null : value))
  @IsExistEmailOrPhone('phone', { message: 'Одно из полей email или phone должно быть заполнено!' })
  email?: string;

  @Expose()
  @IsPhoneNumber('KZ', { message: 'Поле phone должно быть действительным номером телефона Казахстана' })
  @ValidateIf((o) => o.email === null || o.email.length < 0)
  @Transform(({ value }) => (value === '' ? null : value))
  @IsExistEmailOrPhone('email', { message: 'Одно из полей email или phone должно быть заполнено!' })
  phone?: string;

  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Поле password обязательное' })
  password!: string;
}
