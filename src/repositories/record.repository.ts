import { Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { Record } from '../entities/record.entity';
import { IRecord } from '../interfaces/IRecord.interface';
import dayjs from 'dayjs';

export class RecordRepository extends Repository<Record> {
  constructor() {
    super(Record, appDataSource.createEntityManager());
  }

  public createRecord = async (record: IRecord) => {
    return await this.save(record);
  };

  public getAllRecords = async (id: number, isActual: boolean): Promise<IRecord[]> => {
    const date = dayjs().format('YYYY-MM-DDTHH:mm:ss');

    const queryBuilder = this.createQueryBuilder('records').where('records.patientId = :id', { id });

    if (isActual) {
      queryBuilder.andWhere('records.datetime >= :date', { date });
    } else {
      queryBuilder.andWhere('records.datetime < :date', { date });
    }

    return await queryBuilder.getMany();
  };

  public getOneRecord = async (id: number) => {
    return await this.findOne({
      where: { id },
    });
  };

  async transferRecord(id: number, newDataTime: string, broadcast?: string) {
    const result = await this.createQueryBuilder().update(Record).set({ datetime: newDataTime, broadcast }).where('id = :id', { id }).execute();

    return result.affected ? id : null;
  }

  public deleteRecord = async (id: number) => {
    return this.delete(id);
  };
}
