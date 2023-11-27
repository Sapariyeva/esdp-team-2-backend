import { PhotoDto } from '../dto/photo.dto';
import { IPhoto } from '../interfaces/IPhoto.interface';
import { PhotoRepository } from '../repositories/photo.repository';

export class PhotoService {
  private repository: PhotoRepository;

  constructor() {
    this.repository = new PhotoRepository();
  }

  public createPhoto = async (photoDto: PhotoDto): Promise<IPhoto> => {
    return await this.repository.createPhoto(photoDto);
  };
}
