import { UsersRepository } from '../repositories/users.repository';
import { IUserTokenData } from '../interfaces/IUser.interface';
import { AuthUserDto } from '../dto/authUser.dto';

export class AuthService {
  private repository: UsersRepository;

  constructor() {
    this.repository = new UsersRepository();
  }

  signUp = async (userDto: AuthUserDto) => {
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
}
