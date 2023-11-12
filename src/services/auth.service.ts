import { SignInPatientDto } from '../dto/signInPatient.dto';
import { PatientRepository } from '../repositories/patient.repository';
import { SignUpPatientDto } from '../dto/signUpPatient.dto';
import { IPatientTokenData } from '../interfaces/IPatient.interface';

export class AuthService {
  private repository: PatientRepository;

  constructor() {
    this.repository = new PatientRepository();
  }
  signUp = async (signUpPatientDto: SignUpPatientDto) => {
    return await this.repository.singUp(signUpPatientDto);
  };
  signIn = async (singInPatientDto: SignInPatientDto) => {
    return await this.repository.signIn(singInPatientDto);
  };
  refresh = async (patientData: IPatientTokenData) => {
    return await this.repository.refresh(patientData);
  };
  signOut = async (refreshToken: string) => {
    return await this.repository.signOut(refreshToken);
  };
}
