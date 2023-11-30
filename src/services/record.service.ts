import { RecordDto } from '../dto/record.dto';
import { IRecord } from '../interfaces/IRecord.interface';
import { PsychologistRepository } from '../repositories/psychologist.repository';
import { RecordRepository } from '../repositories/record.repository';
import { IPsychologist } from '../interfaces/IPsychologist.interface';
import { PatientRepository } from '../repositories/patient.repository';

export class RecordService {
  private repository: RecordRepository;
  private repositoryPsycho: PsychologistRepository;
  private repositoryPatient: PatientRepository;

  constructor() {
    this.repository = new RecordRepository();
    this.repositoryPsycho = new PsychologistRepository();
    this.repositoryPatient = new PatientRepository();
  }

  public createRecord = async (psychologist: IPsychologist, dto: RecordDto) => {
    const record: IRecord = {
      patientId: 0,
      psychologistId: 0,
      cityId: 0,
      datetime: '',
      cost: 0,
      format: 'online',
      broadcast: '',
      address: '',
      isCanceled: false,
      patientName: '',
    };

    record.cityId = psychologist.cityId;
    record.datetime = dto.datetime;
    record.cost = psychologist.cost;
    record.broadcast = 'some link';
    record.patientId = dto.patientId;
    record.psychologistId = psychologist.id;
    record.format = psychologist.format;
    record.patientName = dto.patientName;
    record.address = psychologist.address;
    return await this.repository.createRecord(record);
  };

  public getAllRecords = async (): Promise<IRecord[]> => {
    return await this.repository.getAllRecords();
  };

  public getOneRecord = async (id: number): Promise<IRecord | null> => {
    return await this.repository.getOneRecord(id);
  };

  public cancelRecord = async (record: IRecord) => {
    record.isCanceled = true;
    return await this.repository.cancelRecord(record);

    return;
  };

  public checkPsychologists = async (id: number) => {
    return await this.repositoryPsycho.findOnePsychologist({ id: id });
  };

  public checkPatient = async (id: number) => {
    return await this.repositoryPatient.findOnePatient({ userId: id });
  };

  public checkRecord = async (id: number) => {
    return await this.getOneRecord(id);
  };
}
