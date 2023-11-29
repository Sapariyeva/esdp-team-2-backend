import { PsychologistDto } from '../dto/psychologist.dto';
import { IPsychologist } from '../interfaces/IPsychologist.interface';
import { PsychologistRepository } from '../repositories/psychologist.repository';

export class PsychologistService {
  private repository: PsychologistRepository;

  constructor() {
    this.repository = new PsychologistRepository();
  }

  public createPsychologist = async (
    psychologistDto: PsychologistDto,
    certificateList: string[],
    photosList: string[],
  ): Promise<IPsychologist | null> => {
    const { id } = await this.repository.savePsychologist(psychologistDto, certificateList, photosList);
    return await this.repository.findOnePsychologist({ id });
  };

  public getOnePsychologist = async (id: number): Promise<IPsychologist | null> => {
    return await this.repository.findOnePsychologist({ id });
  };

  public getPsychologists = async (): Promise<IPsychologist[]> => {
    return await this.repository.findPsychologists();
  };

  public editPsychologist = async (id: number, psychologistDto: PsychologistDto) => {
    return await this.repository.editPsychologist(id, psychologistDto);
  };

  public publishPsychologist = async (id: number) => {
    return await this.repository.publishPsychologist(id);
  };

  public deletePsychologist = async (id: number) => {
    return await this.repository.deletePsychologist(id);
  };

  public isPsychologistCreatable = async (userId: number): Promise<boolean> => {
    const psychologist = await this.repository.findOnePsychologist({ userId });

    return !psychologist;
  };
}
