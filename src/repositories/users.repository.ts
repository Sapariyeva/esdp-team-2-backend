import { FindOptionsWhere, Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { User } from '../entities/user.entity';
import { UserRole } from '../interfaces/UserRole.enum';
import { Role } from '../entities/role.entity';
import { IUser, IUserEditAccount, IUserTokens } from '../interfaces/IUser.interface';
import { Patient } from '../entities/patient.entity';
import { UserRegisterRequestDto } from '../dto/userRegisterRequest.dto';
import { Psychologist } from '../entities/psychologist.entity';

export class UsersRepository extends Repository<User> {
  constructor() {
    super(User, appDataSource.createEntityManager());
  }

  createUser = async (userData: UserRegisterRequestDto | User, relation: Patient | Psychologist, role: Role): Promise<User> => {
    if (userData instanceof User) {
      relation instanceof Patient ? (userData.patient = relation) : (userData.psychologist = relation);

      userData.roles?.push(role);
      return await this.save(userData);
    }

    const userEntity = this.create({ ...userData, [role.name]: relation, roles: [role] });
    return await this.save(userEntity);
  };

  generateNewTokens = async (user: User, roleName: UserRole): Promise<IUserTokens> => {
    const userTokens: IUserTokens = {
      refreshToken: user.generateRefreshToken(roleName),
      accessToken: user.generateAccessToken(roleName),
    };

    await this.save(user);
    return userTokens;
  };

  findUserByIdWithRole = async (id: number, roleName: UserRole): Promise<User | null> => {
    const relations = { roles: true, [roleName]: true };
    return await this.findOne({ where: { id }, relations });
  };

  findUserByEmail = async (email: string): Promise<User | null> => {
    const relations = { roles: true };
    return await this.findOne({ where: { email }, relations });
  };

  findUserByUsername = async (username: string): Promise<User | null> => {
    const relations = { roles: true };
    return await this.findOne({ where: { username }, relations });
  };

  checkPassword = async (user: User, password: string): Promise<boolean> => {
    return await user.comparePassword(password);
  };

  activateEmail = async (id: number) => {
    const userActive = await this.findOne({ where: { id } });

    if (userActive?.email) {
      userActive.isActivated = true;
      await this.save(userActive);
    }
    return userActive;
  };

  findOneUser = async (where: FindOptionsWhere<User>): Promise<User | null> => {
    return await this.findOne({ where });
  };

  findOneUserWithRealtions = async (where: FindOptionsWhere<User>): Promise<User | null> => {
    return await this.findOne({ where, relations: { patient: true, psychologist: true } });
  };

  findUserByPhone = async (phone: string): Promise<IUser | null> => {
    return await this.findOne({ where: { phone } });
  };

  editUser = async (
    user: IUser,
    userDto: Omit<IUserEditAccount, 'сurrentPassword'>,
  ): Promise<{ updatedUser: IUser | null; passwordUpdated: boolean }> => {
    const userEntity = await this.findOneBy({ id: user.id });
    let passwordUpdated = false;
    if (!userEntity) return { updatedUser: null, passwordUpdated };

    userEntity.email = userDto.email ?? userEntity.email;
    userEntity.phone = userDto.phone ?? userEntity.phone;

    if (userDto.password) {
      userEntity.password = userDto.password;
      await userEntity.hashPassword();
      passwordUpdated = true;
      const updatedUser = await this.save(userEntity);
      return { updatedUser, passwordUpdated };
    }

    const updatedUser = await this.save(userEntity, { listeners: false });
    return { updatedUser, passwordUpdated };
  };

  generateTokenPasswordReset = (user: User): string => {
    return user.generatePasswordResetToken();
  };

  generateNewPassword = async (user: User, password: string) => {
    user.password = password;
    await user.hashPassword();
    await this.save(user);
  };
}
