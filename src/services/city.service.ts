import { ICity } from '../interfaces/ICity.interface';
import { CityRepository } from '../repositories/city.repository';

export class CityService {
  private repository: CityRepository;

  constructor() {
    this.repository = new CityRepository();
  }

  public getAllCity = async (): Promise<ICity[]> => {
    return await this.repository.getAllCity();
  };
}
