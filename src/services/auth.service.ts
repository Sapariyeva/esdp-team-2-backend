import { UsersRepository } from '../repositories/users.repository';
import { IUser, IUserEditAccount, IUserTokens } from '../interfaces/IUser.interface';
import { EmailMessage } from '../interfaces/email/IEmailMessage';
import mailer from '../email/nodemailer';
import { Patient } from '../entities/patient.entity';
import { RoleRepository } from '../repositories/role.repository';
import { UserRole } from '../interfaces/UserRole.enum';
import { UserRegisterRequestDto } from '../dto/userRegisterRequest.dto';
import { User } from '../entities/user.entity';
import { Psychologist } from '../entities/psychologist.entity';

export class AuthService {
  private repository: UsersRepository;
  private roleRepository: RoleRepository;

  constructor() {
    this.repository = new UsersRepository();
    this.roleRepository = new RoleRepository();
  }

  registerUser = async (
    userData: UserRegisterRequestDto | User,
    relation: Patient | Psychologist,
    roleName: UserRole,
  ): Promise<(IUserTokens & Pick<IUser, 'id'>) | null> => {
    const role = await this.roleRepository.findOne({ where: { name: roleName } });
    if (!role) return null;

    const user = await this.repository.createUser(userData, relation, role);
    const tokens = await this.repository.generateNewTokens(user, roleName);

    return { id: user.id, ...tokens };
  };

  loginUser = async (user: User, roleName: UserRole): Promise<IUserTokens & Pick<IUser, 'id'>> => {
    const tokens = await this.repository.generateNewTokens(user, roleName);
    return { id: user.id, ...tokens };
  };

  logoutUser = async (userId: number, roleName: UserRole) => {
    const user = await this.repository.findUserByIdWithRole(userId, roleName);
    if (!user) return null;

    return await this.repository.generateNewTokens(user, roleName);
  };

  generateRefreshTokenByUserId = async (userId: number, roleName: UserRole, refreshToken: string): Promise<IUserTokens | null> => {
    const user = await this.repository.findUserByIdWithRole(userId, roleName);
    if (!user) return null;

    if (user.refreshToken !== refreshToken) return null;

    return await this.repository.generateNewTokens(user, roleName);
  };

  activateEmail = async (id: number, roleName: string) => {
    return await this.repository.activateEmail(id, roleName);
  };

  checkPassword = async (id: number, password: string): Promise<IUser | null> => {
    const user: User | null = await this.repository.findOneBy({ id });
    if (!user) return null;

    const isValidPassword: boolean = await this.repository.checkPassword(user, password);
    if (!isValidPassword) return null;

    return user;
  };

  editUser = async (
    user: IUser,
    userDto: Omit<IUserEditAccount, 'сurrentPassword'>,
  ): Promise<{ updatedUser: IUser | null; passwordUpdated: boolean }> => {
    const updatedUser = await this.repository.editUser(user, userDto);
    return updatedUser;
  };

  emailSendMessage = async (email: string, userId: number, roleName: string) => {
    if (email) {
      const message = {
        to: email,
        subject: 'Подтверждение почты',
        html: `<h2>Вы зарегистрировались</h2>
          <i>Ваши данные:</i>
          <ul>
            <li>login: ${email}</li>
          </ul>
          <a href="http://64.226.100.37/auth/activate/${userId}?role=${roleName}">Подтвердить почту</a>
        `,
      } as unknown as EmailMessage;
      mailer(message);
    }
  };

  findOneUser = async (id: number): Promise<User | null> => {
    return await this.repository.findOneUser({ id });
  };

  getUserByIdWithRole = async (id: number, role: UserRole): Promise<User | null> => {
    return await this.repository.findUserByIdWithRole(id, role);
  };

  getUserByEmail = async (email: string): Promise<User | null> => {
    return await this.repository.findUserByEmail(email);
  };

  getUserByUsername = async (username: string): Promise<User | null> => {
    return await this.repository.findUserByUsername(username);
  };

  findOneUserWithRealtions = async (id: number): Promise<User | null> => {
    return await this.repository.findOneUserWithRealtions({ id });
  };

  getUserByPhone = async (phone: string): Promise<IUser | null> => {
    return await this.repository.findUserByPhone(phone);
  };

  isUserHaveRole = (user: User, roleName: UserRole): boolean => {
    if (!Array.isArray(user.roles)) throw new Error('Отсутствует массив ролей');
    return user.roles.some((role) => role.name === roleName);
  };

  isValidPassword = async (user: User, password: string): Promise<boolean> => {
    return await this.repository.checkPassword(user, password);
  };

  emailMessagePasswordForgot = async (user: User) => {
    const tokenPasswordReset = this.repository.generateTokenPasswordReset(user);

    const link = `http://localhost:5173/auth/reset-password?token=${tokenPasswordReset}`;

    const message = {
      to: user.email,
      subject: 'Восстановление пароля',
      html: `<h2>Здравствуйте, ${user.email}!</h2>
          <p>Мы получили запрос на восстановление пароля для вашей учетной записи.</p>
          <a href="${link}">Для восстановления пароля перейдите по ссылке</a>
          <p>Если вы не запрашивали этот код, можете смело игнорировать это сообщение электронной почты. Возможно, кто-то ввел ваш адрес электронной почты по ошибке.</p>
  
          <p>С уважением, Gamma</p>
        `,
    } as unknown as EmailMessage;

    mailer(message);
  };

  resetPassword = async (user: User, password: string) => {
    await this.repository.generateNewPassword(user, password);
  };
}
