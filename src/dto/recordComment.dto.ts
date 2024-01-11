import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CommentDto {
  @Expose()
  @IsOptional()
  @IsString()
  comment!: string;
}
