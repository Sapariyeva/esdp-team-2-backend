import { RecordDto } from '../dto/record.dto';
import { IRecord } from '../interfaces/IRecord.interface';
import { PsychologistRepository } from '../repositories/psychologist.repository';
import { RecordRepository } from '../repositories/record.repository';
import { ApiError } from '../helpers/api-error';
import { IPsychologist } from '../interfaces/IPsychologist.interface';

export class RecordService {
  private repository: RecordRepository;
  private repositoryPsycho: PsychologistRepository;

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
      duration: 0,
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
    record.duration = 60;
    record.format = psychologist.format;
    record.address = psychologist.address;
    return await this.repository.createRecord(record);
  };

  public getAllRecords = async (): Promise<IRecord[]> => {
    return await this.repository.getAllRecords();
  };

  public getOneRecord = async (id: number): Promise<IRecord | null> => {
    return await this.repository.getOneRecord(id);
  };

  public cancelRecord = async (id: number) => {
    const newRecord = await this.getOneRecord(id);
    if (newRecord != null) {
      newRecord.isCanceled = true;
      return await this.repository.cancelRecord(newRecord);
    }
    return ApiError.BadRequest('Нельзя отменить запись');
  };

  public checkPsychologists = async (id: number) => {
    return await this.repositoryPsycho.findOnePsychologist({ id: id });
  };

  public checkPatient = async (id: number) => {
    return await this.repositoryPatient.findOnePatient({ id: id });
  };
}
