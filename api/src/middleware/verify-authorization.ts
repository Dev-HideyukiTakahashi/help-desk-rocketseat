import { NextFunction, Request, Response } from 'express';
import { AppError } from '../util/app-error';

export function verifyAuthorization(role: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.user) {
      throw new AppError('Não autorizado', 401);
    }

    if (!role.includes(request.user.role)) {
      throw new AppError('Acesso negado. Você não tem permissão para realizar esta ação.', 403);
    }

    return next();
  };
}
