import { Expose } from 'class-transformer';
import { IPost } from '../interfaces/IPost.interface';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostDto implements IPost {
  @Expose()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  image?: string;
}
