import { WorkTime } from '../entities/workTime.entity';
import { Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { ScheduleItemDto } from '../dto/scheduleItem.dto';
import { IWorkTime } from '../interfaces/IWorkTime.interface';

export class WorkTimeRepository extends Repository<WorkTime> {
  constructor() {
    super(WorkTime, appDataSource.createEntityManager());
  }

  public createScheduleItem = async (scheduleItemDto: ScheduleItemDto, psychologistId: number): Promise<IWorkTime | null> => {
    const { date, time } = scheduleItemDto;

    const existingTimeSlot = await this.createQueryBuilder('work_time')
      .where('work_time.psychologistId = :psychologistId', { psychologistId })
      .andWhere('DATE(work_time.date) = :date', { date })
      .andWhere('CAST(work_time.time AS TIME) = CAST(:time AS TIME)', { time })
      .getOne();

    if (existingTimeSlot) return null;

    const newDate = this.create({
      ...scheduleItemDto,
      psychologistId,
    });

    return await this.save(newDate);
  };
  async getWorkDaysForPsychologistInDate(psychologistId: number, date: string): Promise<WorkTime[]> {
    return this.createQueryBuilder('work_time')
      .where('work_time.psychologistId = :psychologistId', { psychologistId })
      .andWhere('DATE(work_time.date) = :date', { date })
      .getMany();
  }
  async deleteTime(psychologistId: number, id: number): Promise<void | null> {
    const result = await this.createQueryBuilder()
      .delete()
      .from(WorkTime)
      .where('psychologistId = :psychologistId', { psychologistId })
      .andWhere('id = :id', { id })
      .execute();

    if (result.affected === 0) return null;
  }
}
