import { IsString, IsDate, IsNotEmpty, IsPhoneNumber, ValidateIf, IsEmail } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { IsExistEmailOrPhone } from '../validators/IsExistEmailOrPhone';

export class SignUpUserDto {
  @Expose()
  @IsEmail({}, { message: 'Введите действительный адрес электронной почты' })
  @ValidateIf((o) => o.phone === null)
  @Transform(({ value }) => (value === '' ? null : value))
  @IsExistEmailOrPhone('phone', { message: 'Одно из полей email или phone должно быть заполнено!' })
  email?: string;

  @Expose()
  @IsPhoneNumber('KZ', { message: 'Поле phone должно быть действительным номером телефона Казахстана' })
  @ValidateIf((o) => (o.email === null && typeof o.phone === 'string') || (typeof o.email === 'string' && typeof o.phone === 'string'))
  @Transform(({ value }) => (value === '' ? null : value))
  @IsExistEmailOrPhone('email', { message: 'Одно из полей email или phone должно быть заполнено!' })
  phone?: string;

  @Expose()
  @IsNotEmpty({ message: 'Поле date обязательное' })
  @Type(() => Date)
  @IsDate({ message: 'Неверный формат даты' })
  date_of_birth!: string;

  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Поле password обязательное' })
  password!: string;
}
