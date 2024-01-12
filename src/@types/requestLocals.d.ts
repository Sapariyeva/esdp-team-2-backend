import ICustomLocals from '../interfaces/ICustomLocals.interface';

declare global {
  namespace Express {
    interface Request {
      customLocals: ICustomLocals;
    }
  }
}
