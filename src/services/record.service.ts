import { RecordDto } from '../dto/record.dto';
import { IRecord } from '../interfaces/IRecord.interface';
import { PsychologistRepository } from '../repositories/psychologist.repository';
import { RecordRepository } from '../repositories/record.repository';
import { IPsychologist } from '../interfaces/IPsychologist.interface';
import { PatientRepository } from '../repositories/patient.repository';
import { Record } from '../entities/record.entity';

export class RecordService {
  private repository: RecordRepository;
  private repositoryPsycho: PsychologistRepository;
  private repositoryPatient: PatientRepository;

  constructor() {
    this.repository = new RecordRepository();
    this.repositoryPsycho = new PsychologistRepository();
    this.repositoryPatient = new PatientRepository();
  }

  public createRecord = async (psychologist: IPsychologist, dto: RecordDto, link?: string) => {
    const record = new Record();
    Object.assign(record, {
      patientId: dto.patientId,
      psychologistId: psychologist.id,
      slotId: dto.slotId,
      psychologistName: psychologist.fullName,
      cityId: psychologist.cityId,
      datetime: dto.datetime,
      cost: psychologist.cost,
      format: dto.format,
      broadcast: link ? link : null,
      address: link ? null : psychologist.address,
      isCanceled: false,
      patientName: dto.patientName,
    });

    return await this.repository.createRecord(record);
  };

  public getAllRecords = async (id: number, isActual: boolean): Promise<IRecord[]> => {
    return await this.repository.getAllRecords(id, isActual);
  };

  public getOneRecord = async (id: number): Promise<IRecord | null> => {
    return await this.repository.getOneRecord(id);
  };

  public deleteRecord = async (id: number) => {
    return await this.repository.deleteRecord(id);
  };

  public checkPsychologists = async (id: number) => {
    return await this.repositoryPsycho.findOnePsychologist({ id: id });
  };

  public checkPatient = async (id: number) => {
    return await this.repositoryPatient.findOnePatient({ userId: id });
  };
  public transferRecord = async (id: number, newDataTime: string, broadcast?: string) => {
    return await this.repository.transferRecord(id, newDataTime, broadcast);
  };

  public checkRecord = async (id: number) => {
    return await this.getOneRecord(id);
  };
}
