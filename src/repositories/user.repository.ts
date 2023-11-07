import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

import { appDataSource } from '../config/dataSource';
import { SignInUserDto } from '../dto/signInUser.dto';
import { TokenRepository } from './token.repository';

export class UserRepository extends Repository<User> {
  private tokenRepository: TokenRepository;
  constructor() {
    super(User, appDataSource.createEntityManager());
    this.tokenRepository = new TokenRepository();
  }

  async signIn(signInUserDto: SignInUserDto) {
    const user = await this.findOne({ where: { email: signInUserDto.email } });
    if (!user) throw new Error('User not exist');

    const isMatch = await user.comparePassword(signInUserDto.password);

    if (!isMatch) throw new Error('Login or password is wrong');

    const tokens = await this.tokenRepository.generateTokens(signInUserDto);
    await this.tokenRepository.saveToken(user.id, tokens.refreshToken);
    return { tokens, email: user.email };
  }

  //   async refresh(token: string): Promise<IUser> {
  //     const user = await this.getUserByToken(token);
  //     if (!user) throw new Error('User not exist');
  //     user.generateRefreshToken();
  //     const userWithToken: IUser = await this.save(user);
  //     const accessToken = user.generateAccessToken();
  //     userWithToken.accessToken = accessToken;

  //     return { ...userWithToken, password: undefined };
  //   }

  //   async getUserByToken(refreshToken: string) {
  //     return await this.findOneBy({ refreshToken });
  //   }
  //   async getUserByUsername(username: string) {
  //     return await this.findOneBy({ username });
  //   }
  //   async clearToken(id: number) {
  //     const user = await this.findOneBy({ id });
  //     if (user) {
  //       user.refreshToken = undefined;
  //       this.save(user);
  //     }
  //   }
}
