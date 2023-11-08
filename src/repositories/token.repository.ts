import { Repository } from 'typeorm';
import { Token } from '../entities/token.entity';
import { appDataSource } from '../config/dataSource';
import jwt from 'jsonwebtoken';
import config from '../config';
import { IUser } from '../interfaces/IUser.interface';

export class TokenRepository extends Repository<Token> {
  constructor() {
    super(Token, appDataSource.createEntityManager());
  }
  async generateTokens() {
    const token = new Token();
    const accessToken = token.generateAccessToken();
    const refreshToken = token.generateRefreshToken();
    return {
      accessToken,
      refreshToken,
    };
  }
  validateAccessToken(token: string): IUser | null {
    try {
      return jwt.verify(token, config.secretKey) as IUser;
    } catch (e) {
      return null;
    }
  }
  validateRefreshToken(token: string): IUser | null {
    try {
      return jwt.verify(token, config.secretKey) as IUser;
    } catch (e) {
      return null;
    }
  }
  async findToken(refreshToken: string) {
    return await this.findOne({ where: { refresh_token: refreshToken } });
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.findOne({ where: { user_id: userId } });
    if (tokenData) {
      tokenData.refresh_token = refreshToken;
      return this.save(tokenData);
    }
    return await this.save({ user_id: userId, refresh_token: refreshToken });
  }
}
