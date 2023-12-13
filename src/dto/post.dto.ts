import { Expose, Transform } from 'class-transformer';
import { IPost } from '../interfaces/IPost.interface';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class PostDto implements IPost {
  @Expose()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  image!: string;

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNumber()
  @Min(0, { message: 'Не валидный id психолога' })
  psychologistId!: number;
}
