import { RequestHandler } from 'express';

const initCustomLocals = (): RequestHandler => (req, res, next) => {
  req.customLocals = {};

  next();
};

export default initCustomLocals;
