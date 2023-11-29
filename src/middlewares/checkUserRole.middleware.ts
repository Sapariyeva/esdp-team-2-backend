import { NextFunction, RequestHandler, Response } from 'express';
import { ApiError } from '../helpers/api-error';
import { IRole } from '../interfaces/IRole.interface';

export const checkUserRole: (requiredRole: string) => RequestHandler = (requiredRole) => {
  return (req, res: Response, next: NextFunction) => {
    const userRoles = req.customLocals.userJwtPayload?.role || [];

    if (userRoles.some((role: IRole) => role.name === requiredRole)) {
      next();
    } else {
      next(ApiError.Forbidden());
    }
  };
};
