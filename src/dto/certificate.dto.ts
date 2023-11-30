import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
export class CertificateDto {
  @Expose()
  @IsNotEmpty()
  certificate!: string;

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNumber()
  @Min(0, { message: 'Не валидный id психолога' })
  psychologistId!: number;
}
