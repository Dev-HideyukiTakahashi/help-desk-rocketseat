import { hash } from 'bcrypt';
import { prisma } from '../config/prisma-config';
import { CreateClientPayload, responseClientSchema } from '../schema/client-schema';

export class ClientService {
  async create(payload: CreateClientPayload) {
    const { email, password, name } = payload;

    const hashedPassword = await hash(password, 8);

    const data = await prisma.client.create({
      data: {
        profilePhoto: '',
        name,
        email,
        password: hashedPassword,
        role: 'CLIENT',
      },
    });

    const { password: _, ...userWithoutPassword } = data;
    const client = responseClientSchema.parse(userWithoutPassword);

    return client;
  }
}
