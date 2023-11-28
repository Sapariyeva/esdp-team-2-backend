import { Repository } from 'typeorm';
import { Photo } from '../entities/photo.entity';
import { appDataSource } from '../config/dataSource';
import { PhotoDto } from '../dto/photo.dto';
import { IPhoto } from '../interfaces/IPhoto.interface';

export class PhotoRepository extends Repository<Photo> {
  constructor() {
    super(Photo, appDataSource.createEntityManager());
  }

  public createPhoto = async (photoDto: PhotoDto): Promise<IPhoto> => {
    const { photo, psychologistId } = photoDto;
    const newPhoto = new Photo();
    newPhoto.photo = photo;
    newPhoto.psychologistId = psychologistId;
    await this.save(newPhoto);
    return newPhoto;
  };
}
