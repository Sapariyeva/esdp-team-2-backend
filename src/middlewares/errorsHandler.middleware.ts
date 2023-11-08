import { Request, Response } from 'express';
import { ApiError } from '../helpers/api-error';

export const errorsHandler = (err: Error, req: Request, res: Response) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: 'Internal Server Error', errors: [] });
};
