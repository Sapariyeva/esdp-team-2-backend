import { RequestHandler } from 'express';
import { ApiError } from '../helpers/api-error';
import { TokenRepository } from '../repositories/token.repository';

export const validateRefreshToken: RequestHandler = async (req, res, next) => {
  const tokenRepository = new TokenRepository();
  try {
    const refreshToken = req.cookies.refreshToken;
    const userTokenData = tokenRepository.validateRefreshToken(refreshToken);

    if (!userTokenData) {
      throw ApiError.UnauthorizedError();
    }
    req.customLocals.userTokenData = userTokenData;
    next();
  } catch (error) {
    next(error);
  }
};
