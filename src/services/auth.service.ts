import { SignInUserDto } from '../dto/signInUser.dto';
import { UserRepository } from '../repositories/user.repository';

export class AuthService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  signIn = async (singInUserDto: SignInUserDto) => {
    return await this.repository.signIn(singInUserDto);
  };
}
