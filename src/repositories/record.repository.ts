import { Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';

import { Record } from '../entities/record.entity';
import { RecordDto } from '../dto/record.dto';
import { IRecord } from '../interfaces/IRecord.interface';

export class RecordRepository extends Repository<Record> {
  constructor() {
    super(Record, appDataSource.createEntityManager());
  }

  public createRecord = async (RecordDto: RecordDto) => {
    return await this.save(RecordDto);
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
    return await this.save(record as RecordDto);
  };
}
