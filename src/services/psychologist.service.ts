import { IPsychologist, IPsychologistClientData, IPsychologistNewData } from '../interfaces/IPsychologist.interface';
import { ISymptom } from '../interfaces/ISymptom.interface';
import { ITechnique } from '../interfaces/ITechnique.interface';
import { ITherapyMethod } from '../interfaces/ITherapyMethod.interface';
import { PsychologistRepository } from '../repositories/psychologist.repository';
import { SymptomRepository } from '../repositories/symptom.repository';
import { TechniqueRepository } from '../repositories/technique.repository';
import { TherapyMethodRepository } from '../repositories/therapyMethod.repository';

interface IPsychologistSkills extends Pick<IPsychologistNewData, 'therapyMethods' | 'techniques' | 'symptoms'> {}

export class PsychologistService {
  private repository: PsychologistRepository;
  private therapyMethodRepository: TherapyMethodRepository;
  private techniqueRepository: TechniqueRepository;
  private symptomRepository: SymptomRepository;

  constructor() {
    this.repository = new PsychologistRepository();
    this.therapyMethodRepository = new TherapyMethodRepository();
    this.techniqueRepository = new TechniqueRepository();
    this.symptomRepository = new SymptomRepository();
  }

  public createPsychologist = async (
    { therapyMethodIds, techniqueIds, symptomIds, ...restPsychologistClientData }: IPsychologistClientData,
    certificateList: string[],
    photosList: string[],
  ): Promise<IPsychologist | null> => {
    const psychologistSkills = await this.getAllPsychologistSkillById(therapyMethodIds, techniqueIds, symptomIds);
    const psychologistNewData: IPsychologistNewData = { ...restPsychologistClientData, ...psychologistSkills };
    const { id } = await this.repository.savePsychologist(psychologistNewData, certificateList, photosList);

    return await this.repository.findOnePsychologist({ id });
  };

  public getOnePsychologist = async (id: number): Promise<IPsychologist | null> => {
    return await this.repository.findOnePsychologist({ id });
  };

  public getPsychologists = async (): Promise<IPsychologist[]> => {
    return await this.repository.findPsychologists();
  };

  public editPsychologist = async (
    id: number,
    { therapyMethodIds, techniqueIds, symptomIds, ...restPsychologistClientData }: IPsychologistClientData,
  ): Promise<IPsychologist | null> => {
    const psychologistSkills = await this.getAllPsychologistSkillById(therapyMethodIds, techniqueIds, symptomIds);
    const psychologistNewData: IPsychologistNewData = { ...restPsychologistClientData, ...psychologistSkills };
    await this.repository.editPsychologist(id, psychologistNewData);

    return await this.repository.findOnePsychologist({ id });
  };

  public publishPsychologist = async (id: number) => {
    return await this.repository.publishPsychologist(id);
  };

  public deletePsychologist = async (id: number) => {
    return await this.repository.deletePsychologist(id);
  };

  public getOnePsychologistByUserId = async (userId: number): Promise<IPsychologist | null> => {
    return await this.repository.findOnePsychologist({ userId });
  };

  private getAllPsychologistSkillById = async (
    therapyMethodIds: number[],
    techniqueIds: number[],
    symptomIds: number[],
  ): Promise<IPsychologistSkills> => {
    const therapyMethods: ITherapyMethod[] = await this.therapyMethodRepository.getAllTherapyMethodById(therapyMethodIds);
    const techniques: ITechnique[] = await this.techniqueRepository.getAllTechniqueById(techniqueIds);
    const symptoms: ISymptom[] = await this.symptomRepository.getAllSymptomById(symptomIds);

    return { therapyMethods, techniques, symptoms };
  };
}
