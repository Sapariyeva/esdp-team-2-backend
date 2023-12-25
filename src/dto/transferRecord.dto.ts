import { Expose, Transform } from 'class-transformer';
import { IsISO8601, IsNumber, Min } from 'class-validator';
import { ITransferRecord } from '../interfaces/ITransferRecord';

export class TransferRecord implements ITransferRecord {
  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNumber()
  @Min(0, { message: 'Не валидный id записи' })
  id!: number;

  @Expose()
  @IsISO8601()
  newDateTime!: string;

  @Expose()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsNumber()
  @Min(0, { message: 'Не валидный slot' })
  newSlotId!: number;
}
