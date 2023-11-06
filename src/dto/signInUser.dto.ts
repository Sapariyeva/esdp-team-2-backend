import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInUserDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  email!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  password!: string;
}
