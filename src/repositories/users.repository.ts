import { FindOptionsWhere, Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { User } from '../entities/user.entity';
import { ApiError } from '../helpers/api-error';
import { RoleRepository } from './role.repository';
import { UserRole } from '../interfaces/UserRole.enum';
import { Role } from '../entities/role.entity';
import { IUser, IUserTokenData } from '../interfaces/IUser.interface';
import { AuthUserDto } from '../dto/authUser.dto';

export class UsersRepository extends Repository<User> {
  private roleRepository: RoleRepository;

  constructor() {
    super(User, appDataSource.createEntityManager());
    this.roleRepository = new RoleRepository();
  }

  async signUp(userDto: AuthUserDto) {
    const existingRole = await this.checkRole(userDto.role);
    const user = await this.emailOrPhoneSearch(userDto, userDto.role);

    if (user) {
      if (this.userHasRole(user, userDto.role)) {
        throw ApiError.BadRequest('Такой пользователь уже существует в базе данных');
      }

      user.roles = this.addUserRole(user.roles, existingRole);
      const tokens = await this.generateAndSaveTokens(user);
      const userData = await this.findUserByIdWithRelations(user.id, existingRole.name);
      if (!userData) return null;
      return { ...userData, role: existingRole.name, ...tokens };
    }

    const newUser = this.create(userDto);
    newUser.roles = [existingRole];
    const tokens = await this.generateAndSaveTokens(newUser);
    const userData = await this.findUserByIdWithRelations(newUser.id, existingRole.name);
    if (!userData) return null;

    const accessToken = userData.generateAccessToken();
    return {
      ...userData,
      role: existingRole.name,
      refreshToken: tokens.refreshToken,
      accessToken,
    };
  }

  async signIn(userDto: AuthUserDto) {
    const existingRole = await this.checkRole(userDto.role);
    const user = await this.emailOrPhoneSearch(userDto, userDto.role);

    if (!user || !this.userHasRole(user, userDto.role)) {
      throw ApiError.BadRequest('Упс, такого пользователя нету в базе данных!');
    }

    const isMatch = await user.comparePassword(userDto.password);
    if (!isMatch) {
      throw ApiError.BadRequest('Введенные вами данные не соответствуют ожидаемым!');
    }

    const tokens = await this.generateAndSaveTokens(user);

    return { accessToken: tokens.accessToken, role: existingRole.name, ...user };
  }

  async signOut(refreshToken: string) {
    const user = await this.findOne({ where: { refreshToken } });

    if (user) {
      user.refreshToken = (await this.generateAndSaveTokens(user)).refreshToken;
      await this.save(user);
    }
  }
  async refresh(userData: IUserTokenData) {
    const user = await this.findOne({ where: { id: userData.id } });
    if (!user) return null;

    const tokens = await this.generateAndSaveTokens(user);

    return {
      ...tokens,
      ...user,
    };
  }

  userHasRole(user: User, role: string) {
    return user.roles?.some((r) => r.name === role);
  }

  addUserRole(existingRoles: Role[] | undefined, role: Role) {
    return existingRoles ? [...existingRoles, role] : [role];
  }

  async generateAndSaveTokens(user: User) {
    const tokens = await this.generateTokens(user);
    user.refreshToken = tokens.refreshToken;
    await this.save(user);
    return tokens;
  }

  async findUserByIdWithRelations(userId: number, role?: string) {
    const relations = role ? { roles: true, [role]: true } : { roles: true };
    return await this.findOne({ where: { id: userId }, relations });
  }

  private async generateTokens(userData: User) {
    const accessToken = userData.generateRefreshToken();
    const refreshToken = userData.generateRefreshToken();
    return {
      accessToken,
      refreshToken,
    };
  }
  private async checkRole(role: UserRole) {
    const existingRole = await this.roleRepository.findOne({ where: { name: role } });

    if (!existingRole) {
      throw ApiError.BadRequest('Упс, такой роли не существует');
    }
    return existingRole;
  }

  async emailOrPhoneSearch(dto: AuthUserDto, entityType: string) {
    const { email, phone } = dto;
    const whereCondition = email ? { email } : { phone };

    return await this.findOne({
      where: whereCondition,
      relations: { roles: true, [entityType]: true },
    });
  }

  async activateEmail(id: number) {
    const userActive = await this.findOne({
      where: {
        id,
      },
    });

    if (userActive) {
      userActive.isActivated = true;
      await this.save(userActive);
    }
  }
  async sendConfirmationLinkToEmail(id: number) {
    const confirmLinkToEmail = await this.findOne({
      where: {
        id: id,
      },
    });
    if (confirmLinkToEmail) {
      confirmLinkToEmail.isActivated = true;
      await this.save(confirmLinkToEmail);
    }
  }
  findOneUser = async (where: FindOptionsWhere<User>): Promise<IUser | null> => {
    return await this.findOne({ where });
  };
}
