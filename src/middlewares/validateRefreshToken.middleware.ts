import { RequestHandler } from 'express';
import { ApiError } from '../helpers/api-error';
import { PatientTokenRepository } from '../repositories/patientToken.repository';

export const validateRefreshToken: RequestHandler = async (req, res, next) => {
  const tokenRepository = new PatientTokenRepository();
  try {
    const refreshToken = req.cookies.refreshToken;
    const userTokenData = tokenRepository.validateRefreshToken(refreshToken);

    if (!userTokenData) {
      throw ApiError.UnauthorizedError();
    }
    req.customLocals.patientTokenData = userTokenData;
    next();
  } catch (error) {
    next(error);
  }
};
