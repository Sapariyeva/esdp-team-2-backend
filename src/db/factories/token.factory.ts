import { setSeederFactory } from 'typeorm-extension';
import { PatientToken } from '../../entities/patientToken.entity';

export const TokenFactory = setSeederFactory(PatientToken, () => {
  const token = new PatientToken();
  token.generateAccessToken();
  token.generateRefreshToken();
  return token;
});
