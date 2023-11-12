import { Repository } from 'typeorm';
import { appDataSource } from '../config/dataSource';
import { SignInPatientDto } from '../dto/signInPatient.dto';
import { SignUpPatientDto } from '../dto/signUpPatient.dto';
import { ApiError } from '../helpers/api-error';
import { Patient } from '../entities/patient.entity';
import { PatientTokenRepository } from './patientToken.repository';
import { IPatient, IPatientTokenData } from '../interfaces/IPatient.interface';

export class PatientRepository extends Repository<Patient> {
  private tokenRepository: PatientTokenRepository;
  constructor() {
    super(Patient, appDataSource.createEntityManager());
    this.tokenRepository = new PatientTokenRepository();
  }

  async singUp(signUpUserDto: SignUpPatientDto) {
    const candidate = await this.emailOrPhoneSearchUser(signUpUserDto);
    if (candidate) return null;

    const userData = this.create(signUpUserDto);
    await this.save(userData);

    const tokens = await this.generateAndSaveTokens(userData);
    return {
      ...tokens,
      ...userData,
    };
  }
  async signIn(signInUserDto: SignInPatientDto) {
    const user = await this.emailOrPhoneSearchUser(signInUserDto);
    if (!user) return null;

    const isMatch = await user.comparePassword(signInUserDto.password);
    if (!isMatch) throw ApiError.BadRequest('Login or password is wrong');

    const tokens = await this.generateAndSaveTokens(user);
    return {
      ...tokens,
      ...user,
    };
  }

  async refresh(userData: IPatient): Promise<IPatientTokenData | null> {
    const user = await this.findOne({ where: { id: userData.id } });
    if (!user) return null;

    const tokens = await this.generateAndSaveTokens(userData);

    return {
      ...tokens,
      ...user,
    };
  }

  async signOut(refreshToken: string) {
    return await this.tokenRepository.removeToken(refreshToken);
  }

  private async generateAndSaveTokens(userData: IPatient) {
    const tokens = await this.tokenRepository.generateTokens();
    await this.tokenRepository.saveToken(userData.id, tokens.refreshToken);
    return tokens;
  }

  private async emailOrPhoneSearchUser(dto: SignUpPatientDto | SignInPatientDto) {
    const { email, phone } = dto;
    return email ? await this.findOne({ where: { email } }) : await this.findOne({ where: { phone } });
  }
}
