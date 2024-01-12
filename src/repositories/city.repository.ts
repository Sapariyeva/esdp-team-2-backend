import { Repository } from 'typeorm';
import { City } from '../entities/city.entity';
import { appDataSource } from '../config/dataSource';
import { ICity } from '../interfaces/ICity.interface';

export class CityRepository extends Repository<City> {
  constructor() {
    super(City, appDataSource.createEntityManager());
  }

  public getAllCity = async (): Promise<ICity[]> => {
    return await this.find();
  };
}
