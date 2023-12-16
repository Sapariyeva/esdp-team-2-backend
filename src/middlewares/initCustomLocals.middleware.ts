import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { IUserJwtPayload } from '../interfaces/IUser.interface';
import config from '../config';

const getTokenPayload = (accessToken: string | undefined): IUserJwtPayload | undefined => {
  try {
    if (!accessToken) throw new Error('Отсутствует токен');

    return jwt.verify(accessToken, config.secretKey) as IUserJwtPayload;
  } catch (e) {
    return undefined;
  }
};

const initCustomLocals = (): RequestHandler => (req, res, next) => {
  req.customLocals = {
    userJwtPayload: getTokenPayload(req.header('Authorization')),
  };

  next();
};

export default initCustomLocals;
