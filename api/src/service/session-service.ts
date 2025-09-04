import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { authConfig } from '../config/auth-config';
import { prisma } from '../config/prisma-config';
import { responseUserSchema } from '../schema/user-schema';
import { AppError } from '../util/app-error';

export class SessionService {
  async login(email: string, password: string) {
    const data = await prisma.user.findUnique({ where: { email } });

    if (!data) {
      throw new AppError('Credenciais inválidas.');
    }

    const isPasswordValid = await compare(password, data.password);
    if (!isPasswordValid) {
      throw new AppError('Credenciais inválidas.');
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ role: data.role ?? 'CLIENT' }, secret, {
      subject: data.id,
      expiresIn,
    });

    const { password: _, ...userWithoutPassword } = data;
    const user = responseUserSchema.parse(userWithoutPassword);

    return { user, token };
  }
}
