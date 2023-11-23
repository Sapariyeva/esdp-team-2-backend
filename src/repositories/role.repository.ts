import { Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { Role } from '../entities/role.entity';

export class RoleRepository extends Repository<Role> {
  constructor() {
    super(Role, appDataSource.createEntityManager());
  }
}
