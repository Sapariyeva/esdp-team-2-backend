import { UsersRepository } from '../repositories/users.repository';
import { IUser, IUserTokenData } from '../interfaces/IUser.interface';
import { AuthUserDto } from '../dto/authUser.dto';
import { EmailMessage } from '../interfaces/email/IEmailMessage';
import mailer from '../email/nodemailer';

export class AuthService {
  private repository: UsersRepository;

  constructor() {
    this.repository = new UsersRepository();
  }

  signUp = async (userDto: AuthUserDto) => {
    this.emailSendMessage(userDto);
    return await this.repository.signUp(userDto);
  };

  signIn = async (userDto: AuthUserDto) => {
    return await this.repository.signIn(userDto);
  };

  signOut = async (refreshToken: string) => {
    return await this.repository.signOut(refreshToken);
  };
  refresh = async (userData: IUserTokenData) => {
    return await this.repository.refresh(userData);
  };
  activateEmail = async (id: number) => {
    return await this.repository.activateEmail(id);
  };
  sendConfirmationLinkToEmail = async (id: number) => {
    return await this.repository.sendConfirmationLinkToEmail(id);
  };
  findOneUser = async (id: number): Promise<IUser | null> => {
    const user = await this.repository.findOneUser({ id });

    if (!user) return null;
    return user;
  };
  emailSendMessage = async (userDto: AuthUserDto) => {
    if (userDto.email) {
      const message = {
        to: userDto.email,
        subject: 'Подтверждение почты',
        html: `<h2>Вы зарегистрировались</h2>
          <i>Ваши данные:</i>
          <ul>
            <li>login: ${userDto.email}</li>
          </ul>
          <a href="http://localhost:8000/activate/">Подтвердить почту</a>
        `,
      } as unknown as EmailMessage;
      mailer(message);
    }
  };
}
