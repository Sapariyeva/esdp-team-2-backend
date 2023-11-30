import { IPhoto } from '../interfaces/IPhoto.interface';
import { IPsychologist } from '../interfaces/IPsychologist.interface';
import { PhotoRepository } from '../repositories/photo.repository';
import { PsychologistRepository } from '../repositories/psychologist.repository';

export class PhotoService {
  private repository: PhotoRepository;
  private repositoryPsychologist: PsychologistRepository;

  constructor() {
    this.repository = new PhotoRepository();
    this.repositoryPsychologist = new PsychologistRepository();
  }

  public createPhoto = async (psychologistId: number, photoName: string): Promise<IPhoto> => {
    return await this.repository.createPhoto(psychologistId, photoName);
  };

  public findOnePsychologist = async (userId: number): Promise<IPsychologist | null> => {
    return await this.repositoryPsychologist.findOnePsychologist({ userId });
  };
  public getOnePhoto = async (id: number) => {
    return await this.repository.getOnePhoto(id);
  };
  public deletePhoto = async (id: number) => {
    return await this.repository.deletePhoto(id);
  };
}
