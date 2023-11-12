import { RequestHandler } from 'express';
import ICustomLocals from '../interfaces/ICustomLocals.interface';

const initCustomLocals = (): RequestHandler => (req, res, next) => {
  const initialCustomLocals: ICustomLocals = {
    patientTokenData: undefined,
  };
  req.customLocals = initialCustomLocals;

  next();
};

export default initCustomLocals;
