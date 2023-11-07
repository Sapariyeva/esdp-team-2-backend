import { Repository } from 'typeorm';
import { Token } from '../entities/token.entity';
import { appDataSource } from '../config/dataSource';
import { SignInUserDto } from '../dto/signInUser.dto';

export class TokenRepository extends Repository<Token> {
  constructor() {
    super(Token, appDataSource.createEntityManager());
  }
  async generateTokens(signInUserDto: SignInUserDto) {
    const token = await this.findOne({
      relations: ['user'],
      where: { user: { email: signInUserDto.email } },
    });
    if (token) {
      const accessToken = token.generateAccessToken();
      const refreshToken = token.generateRefreshToken();
      return {
        accessToken,
        refreshToken,
      };
    } else {
      throw new Error('Token not found');
    }
  }
  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.findOne({ where: { user_id: userId } });
    if (tokenData) {
      tokenData.refresh_token = refreshToken;
      return this.save(tokenData);
    }
    const token = await this.create({ user_id: userId, refresh_token: refreshToken });
    return token;
  }
}
