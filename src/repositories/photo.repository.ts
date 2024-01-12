import { Repository } from 'typeorm';
import { Photo } from '../entities/photo.entity';
import { appDataSource } from '../config/dataSource';
import { IPhoto } from '../interfaces/IPhoto.interface';

export class PhotoRepository extends Repository<Photo> {
  constructor() {
    super(Photo, appDataSource.createEntityManager());
  }

  public createPhoto = async (psychologistId: number, photoName: string): Promise<IPhoto> => {
    const newPhoto = new Photo();
    newPhoto.photo = photoName;
    newPhoto.psychologistId = psychologistId;
    return await this.save(newPhoto);
  };

  public getOnePhoto = async (id: number) => {
    return await this.findOne({ where: { id } });
  };

  public deletePhoto = async (id: number) => {
    const result = await this.delete(id);
    return result.affected ? id : null;
  };
}
