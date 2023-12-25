import { NextFunction, RequestHandler, Response } from 'express';
import { ApiError } from '../helpers/api-error';

export const checkUserRole: (requiredRole: string) => RequestHandler = (requiredRole) => {
  return (req, res: Response, next: NextFunction) => {
    const userRoles = req.customLocals.userJwtPayload?.role;

    if (userRoles === requiredRole) {
      next();
    } else {
      next(ApiError.Forbidden());
    }
  };
};
