import { Expose, Transform } from 'class-transformer';
import { IsEmail, IsPhoneNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

import { IUserEditAccount } from '../interfaces/IUser.interface';

export class UserEditAccountDto implements IUserEditAccount {
  @Expose()
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsOptional()
  @IsEmail({}, { message: 'Введите действительный адрес электронной почты' })
  @IsString()
  email?: string;

  @Expose()
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsOptional()
  @IsPhoneNumber('KZ', { message: 'Пожалуйста, предоставьте правильный номер телефона' })
  @IsString()
  phone?: string;

  @Expose()
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsOptional()
  @IsString()
  password?: string;

  @Expose()
  @IsString()
  @IsNotEmpty({ message: 'Поле password обязательное' })
  сurrentPassword!: string;
}
