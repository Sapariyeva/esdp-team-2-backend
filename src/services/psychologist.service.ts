import { PsychologistDto } from '../dto/psychologist.dto';
import { PsychologistRepository } from '../repositories/psychologist.repository';

export class PsychologistService {
  private repository: PsychologistRepository;

  constructor() {
    this.repository = new PsychologistRepository();
  }

  createPsychologist = async (psychologistDto: PsychologistDto, certificates: string[]) => {
    return await this.repository.createPsychologist(psychologistDto, certificates);
  };
}
