import { WorkTimeRepository } from '../repositories/workTime.repository';
import { IWorkTime } from '../interfaces/IWorkTime.interface';
import { ScheduleItemDto } from '../dto/scheduleItem.dto';

export class WorkTImeService {
  private repository: WorkTimeRepository;

  constructor() {
    this.repository = new WorkTimeRepository();
  }

  public createScheduleItem = async (scheduleItemDto: ScheduleItemDto, psychologistId: number): Promise<IWorkTime | null> => {
    return await this.repository.createScheduleItem(scheduleItemDto, psychologistId);
  };
  public getWorkDaysForPsychologistInDate = async (psychologistId: number, date: string, available?: boolean): Promise<IWorkTime[]> => {
    return await this.repository.getWorkDaysForPsychologistInDate(psychologistId, date, available);
  };
  public deleteTime = async (psychologistId: number, id: number) => {
    return await this.repository.deleteTime(psychologistId, id);
  };
}
