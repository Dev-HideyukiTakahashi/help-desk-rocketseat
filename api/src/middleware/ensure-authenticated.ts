import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { authConfig } from '../config/auth-config';
import { AppError } from '../util/app-error';

type TokenPayload = {
  role: string;
  sub: string;
};

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('JWT token não encontrado', 401);
    }

    const [, token] = authHeader.split(' ');
    const { role, sub } = verify(token, authConfig.jwt.secret) as TokenPayload;

    request.user = {
      id: sub,
      role,
    };

    next();
  } catch (error) {
    throw new AppError('JWT token inválido', 401);
  }
}
