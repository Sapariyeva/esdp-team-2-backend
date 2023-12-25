import { UsersRepository } from '../repositories/users.repository';
import { IUser, IUserEditAccount, IUserTokens } from '../interfaces/IUser.interface';
import { AuthUserDto } from '../dto/authUser.dto';
import { EmailMessage } from '../interfaces/email/IEmailMessage';
import mailer from '../email/nodemailer';

export class AuthService {
  private repository: UsersRepository;

  constructor() {
    this.repository = new UsersRepository();
  }

  signUp = async (userDto: AuthUserDto) => {
    const user = await this.repository.signUp(userDto);
    if (user?.email) this.emailSendMessage(user.email, user.id);
    return user;
  };

  signIn = async (userDto: AuthUserDto) => {
    return await this.repository.signIn(userDto);
  };

  signOut = async (refreshToken: string) => {
    return await this.repository.signOut(refreshToken);
  };
  generateRefreshTokenByUserId = async (userId: number, refreshToken: string): Promise<IUserTokens | null> => {
    return await this.repository.updateRefreshToken(userId, refreshToken);
  };

  findUserByIdWithRelations = async (userId: number, role?: string) => {
    return await this.repository.findUserByWithRelations(userId, role);
  };
  activateEmail = async (id: number) => {
    return await this.repository.activateEmail(id);
  };
  findOneUser = async (id: number): Promise<IUser | null> => {
    return await this.repository.findOneUser({ id });
  };

  checkPassword = async (id: number, сurrentPassword: string): Promise<IUser | null> => {
    return await this.repository.checkPassword(id, сurrentPassword);
  };

  findUserByEmail = async (email: string): Promise<IUser | null> => {
    return await this.repository.findUserByEmail(email);
  };

  findUserByPhone = async (phone: string): Promise<IUser | null> => {
    return await this.repository.findUserByPhone(phone);
  };

  editUser = async (
    user: IUser,
    userDto: Omit<IUserEditAccount, 'сurrentPassword'>,
  ): Promise<{ updatedUser: IUser | null; passwordUpdated: boolean }> => {
    const updatedUser = await this.repository.editUser(user, userDto);
    return updatedUser;
  };

  findOneUserWithRealtions = async (id: number): Promise<IUser | null> => {
    return await this.repository.findOneUserWithRealtions({ id });
  };

  emailSendMessage = async (email: string, userId: number) => {
    if (email) {
      const message = {
        to: email,
        subject: 'Подтверждение почты',
        html: `<h2>Вы зарегистрировались</h2>
          <i>Ваши данные:</i>
          <ul>
            <li>login: ${email}</li>
          </ul>
          <a href="http://localhost:5173/auth/activate/${userId}">Подтвердить почту</a>
        `,
      } as unknown as EmailMessage;
      mailer(message);
    }
  };
}
