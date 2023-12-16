import { RequestHandler } from 'express';
import { ApiError } from '../helpers/api-error';

const authenticateUser: RequestHandler = (req, res, next) => {
  try {
    if (!req.customLocals.userJwtPayload) throw ApiError.UnauthorizedError();
    next();
  } catch (e) {
    next(e);
  }
};

export default authenticateUser;
