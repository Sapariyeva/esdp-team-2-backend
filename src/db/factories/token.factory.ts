import { setSeederFactory } from 'typeorm-extension';
import { Token } from '../../entities/token.entity';

export const TokenFactory = setSeederFactory(Token, () => {
  const token = new Token();
  token.generateAccessToken();
  token.generateRefreshToken();
  return token;
});
