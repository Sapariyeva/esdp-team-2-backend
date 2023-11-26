import { RecordDto } from '../dto/record.dto';
import { IRecord } from '../interfaces/IRecord.interface';
import { PsychologistRepository } from '../repositories/psychologist.repository';
import { RecordRepository } from '../repositories/record.repository';

export class RecordService {
  private repository: RecordRepository;
  private repositoryPsycho: PsychologistRepository;

  constructor() {
    this.repository = new RecordRepository();
    this.repositoryPsycho = new PsychologistRepository();
  }

  public createRecord = async (RecordDto: RecordDto) => {
    const psychologist = await this.repositoryPsycho.findOnePsychologist(RecordDto.psychologistId);
    RecordDto.cityId = psychologist?.cityId as number;
    RecordDto.cost = psychologist?.cost as number;
    RecordDto.broadcast = 'some link';
    return await this.repository.createRecord(RecordDto);
  };

  public getAllRecords = async (): Promise<IRecord[]> => {
    return await this.repository.getAllRecords();
  };

  public getOneRecord = async (id: number): Promise<IRecord | null> => {
    return await this.repository.getOneRecord(id);
  };

  public cancelRecord = async (Record: IRecord) => {
    return await this.repository.CancelRecord(Record);
  };
}
