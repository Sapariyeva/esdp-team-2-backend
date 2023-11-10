import { SignInUserDto } from '../dto/signInUser.dto';
import { UserRepository } from '../repositories/user.repository';
import { SignUpUserDto } from '../dto/signUpUser.dto';
import { IUser } from '../interfaces/IUser.interface';

export class AuthService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }
  signUp = async (signUpUserDto: SignUpUserDto) => {
    return await this.repository.singUp(signUpUserDto);
  };
  signIn = async (singInUserDto: SignInUserDto) => {
    return await this.repository.signIn(singInUserDto);
  };
  refresh = async (userData: IUser) => {
    return await this.repository.refresh(userData);
  };
  signOut = async (refreshToken: string) => {
    return await this.repository.signOut(refreshToken);
  };
}
