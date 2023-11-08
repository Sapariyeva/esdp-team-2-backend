import { ErrorRequestHandler } from 'express';
import { ApiError } from '../helpers/api-error';
export const errorsHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: 'Internal Server Error', errors: [] });
};
