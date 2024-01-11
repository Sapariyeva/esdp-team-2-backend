import { Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { Record } from '../entities/record.entity';
import { IRecord } from '../interfaces/IRecord.interface';

export class RecordRepository extends Repository<Record> {
  constructor() {
    super(Record, appDataSource.createEntityManager());
  }

  public createRecord = async (record: IRecord) => {
    return await this.save(record);
  };

  public getAllRecords = async (date: string, id: number, isActual: boolean): Promise<IRecord[]> => {
    const queryBuilder = this.createQueryBuilder('records').where(`records.patientId = :id`, { id });

    if (isActual) {
      queryBuilder.andWhere('records.status = :status', { status: 'active' });
      queryBuilder.andWhere('records.datetime >= :date', { date });
    } else {
      queryBuilder.andWhere('records.status != :status', { status: 'active' });
    }

    return await queryBuilder.getMany();
  };
  public getDateRecords = async (startTime: string, endTime: string, id: number, isActual: boolean): Promise<IRecord[]> => {
    const queryBuilder = this.createQueryBuilder('records').where(`records.psychologist_id = :id`, { id });
    if (isActual) {
      queryBuilder.andWhere('records.status = :status', { status: 'active' });
      queryBuilder.andWhere(`records.datetime BETWEEN :startTime AND :endTime`, { startTime, endTime });
    } else {
      queryBuilder.andWhere('records.status != :status', { status: 'active' });
      queryBuilder.andWhere(`records.datetime BETWEEN :startTime AND :endTime`, { startTime, endTime });
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

  public updateRecordStatus = async (id: number, newStatus: 'active' | 'canceled' | 'inactive') => {
    const result = await this.update(id, { status: newStatus });
    return result.affected ? id : null;
  };
}
