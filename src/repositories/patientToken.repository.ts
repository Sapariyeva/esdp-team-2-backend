import { Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import jwt from 'jsonwebtoken';
import config from '../config';
import { PatientToken } from '../entities/patientToken.entity';
import { IPatient, IPatientTokenData } from '../interfaces/IPatient.interface';

export class PatientTokenRepository extends Repository<PatientToken> {
  constructor() {
    super(PatientToken, appDataSource.createEntityManager());
  }
  async generateTokens() {
    const token = new PatientToken();
    const accessToken = token.generateAccessToken();
    const refreshToken = token.generateRefreshToken();
    return {
      accessToken,
      refreshToken,
    };
  }
  validateAccessToken(token: string): IPatient | null {
    try {
      return jwt.verify(token, config.secretKey) as IPatient;
    } catch (e) {
      return null;
    }
  }
  validateRefreshToken(token: string): IPatientTokenData | null {
    try {
      return jwt.verify(token, config.secretKey) as IPatientTokenData;
    } catch (e) {
      return null;
    }
  }
  async findToken(refreshToken: string) {
    return await this.findOne({ where: { refreshToken } });
  }

  async removeToken(refreshToken: string) {
    return await this.delete({ refreshToken });
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.findOne({ where: { patientId: userId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return this.save(tokenData);
    }
    return await this.save({ patientId: userId, refreshToken });
  }
}
