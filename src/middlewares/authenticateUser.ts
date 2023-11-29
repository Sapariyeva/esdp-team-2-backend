import { RequestHandler } from 'express';
import { ApiError } from '../helpers/api-error';
import config from '../config';
import jwt from 'jsonwebtoken';
import { IUserJwtPayload } from '../interfaces/IUser.interface';

const authenticateUser: RequestHandler = (req, res, next) => {
  try {
    const accessToken = req.header('Authorization');
    if (!accessToken) throw new Error('Отсутствует токен');

    req.customLocals.userJwtPayload = jwt.verify(accessToken, config.secretKey) as IUserJwtPayload;
    next();
  } catch (e) {
    next(ApiError.UnauthorizedError());
  }
};

export default authenticateUser;
