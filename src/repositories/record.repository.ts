import { Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { Record } from '../entities/record.entity';
import { IRecord } from '../interfaces/IRecord.interface';
import { EStatus } from '../enum/EStatus';

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
      queryBuilder.andWhere('records.status = :status', { status: 'Ожидается' });
      queryBuilder.andWhere('records.datetime >= :date', { date });
    } else {
      queryBuilder.andWhere('records.status != :status', { status: 'Ожидается' });
    }

    return await queryBuilder.getMany();
  };
  public getDateRecords = async (startTime: string, endTime: string, id: number, isActual: boolean): Promise<IRecord[]> => {
    const queryBuilder = this.createQueryBuilder('records').where(`records.psychologist_id = :id`, { id });
    if (isActual) {
      queryBuilder.andWhere('records.status = :status', { status: 'Ожидается' });
      queryBuilder.andWhere(`records.datetime BETWEEN :startTime AND :endTime`, { startTime, endTime });
    } else {
      queryBuilder.andWhere('records.status != :status', { status: 'Ожидается' });
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
  public changePresenceStatus = async (id: number, role: 'psychologistAbsent' | 'patientAbsent') => {
    const updateResult = await this.update(id, { [role]: true });
    return updateResult.affected ? id : null;
  };

  async updatePresenceStatus(id: number) {
    const record = await this.getOneRecord(id);

    let overallStatus;
    if (record.patientAbsent && record.psychologistAbsent) {
      overallStatus = EStatus.conducted;
    } else if (record.patientAbsent && !record.psychologistAbsent) {
      overallStatus = EStatus.psychologist_absent;
    } else if (!record.patientAbsent && record.psychologistAbsent) {
      overallStatus = EStatus.patient_absent;
    }

    return await this.updateRecordStatus(id, overallStatus);
  }
  public updateRecordStatus = async (id: number, newStatus: EStatus) => {
    const result = await this.update(id, { status: newStatus });
    return result.affected ? id : null;
  };

  public createCommentPatient = async (id: number, comment: string) => {
    const result = await this.update(id, { commentPatient: comment });
    if (result.affected && result.affected > 0) {
      return await this.findOne({
        where: { id },
      });
    } else {
      return null;
    }
  };

  public createCommentPsychologist = async (id: number, comment: string) => {
    const result = await this.update(id, { commentPsychologist: comment });
    if (result.affected && result.affected > 0) {
      return await this.findOne({
        where: { id },
      });
    } else {
      return null;
    }
  };
}
