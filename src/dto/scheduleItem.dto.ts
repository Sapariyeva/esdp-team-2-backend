import { Expose } from 'class-transformer';
import { IScheduleItem } from '../interfaces/IScheduleItem.iterface';
import { IsISO8601, IsString } from 'class-validator';

export class ScheduleItemDto implements IScheduleItem {
  @Expose()
  @IsISO8601()
  date!: string;

  @Expose()
  @IsString()
  time!: string;
}
