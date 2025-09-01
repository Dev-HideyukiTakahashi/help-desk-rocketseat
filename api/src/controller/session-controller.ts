import { Request, Response } from 'express';
import z from 'zod';
import { SessionService } from '../service/session-service';

const sessionService = new SessionService();

export class SessionController {
  async login(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.email({ message: 'Informe um email válido' }),
      password: z.string().min(6, { message: 'Mínimo de 6 caracteres.' }),
    });

    const { email, password } = bodySchema.parse(request.body);

    const { user, token } = await sessionService.login(email, password);

    return response.json({ user, token });
  }
}
