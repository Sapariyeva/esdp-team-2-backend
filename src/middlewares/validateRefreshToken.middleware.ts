import { RequestHandler } from 'express';
import { ApiError } from '../helpers/api-error';
import { User } from '../entities/user.entity';

export const validateRefreshToken: RequestHandler = async (req, res, next) => {
  const userData = new User();

  try {
    const refreshToken = req.cookies.refreshToken;
    const userTokenData = userData.validateRefreshToken(refreshToken);

    if (!userTokenData) {
      throw ApiError.UnauthorizedError();
    }
    req.customLocals.patientTokenData = userTokenData;
    next();
  } catch (error) {
    next(error);
  }
};
