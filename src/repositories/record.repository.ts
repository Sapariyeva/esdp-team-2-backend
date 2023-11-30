import { Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { Record } from '../entities/record.entity';
import { IRecord } from '../interfaces/IRecord.interface';

export class RecordRepository extends Repository<Record> {
  constructor() {
    super(Record, appDataSource.createEntityManager());
  }

  public createRecord = async (Record: IRecord) => {
    return await this.save(Record);
  };

  public getAllRecords = async (): Promise<IRecord[]> => {
    return await this.find();
  };

  public getOneRecord = async (id: number) => {
    return await this.findOne({
      where: { id },
    });
  };

  public cancelRecord = async (record: IRecord) => {
    return this.save(record);
  };
}
