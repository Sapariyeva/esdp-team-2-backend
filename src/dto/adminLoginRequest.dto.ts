import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdminLoginRequest {
  @Expose()
  @IsNotEmpty({ message: 'Имя пользователя не может быть пустым' })
  @IsString()
  username!: string;

  @Expose()
  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  @IsString()
  password!: string;
}
