import { hash } from 'bcrypt';
import { prisma } from '../config/prisma-config';
import {
  CreateClientPayload,
  responseClientSchema,
  UpdateClientPayload,
} from '../schema/client-schema';

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

  async update(id: string, payload: UpdateClientPayload) {
    const { email, password, name, profilePhoto } = payload;
    const hashedPassword = password ? await hash(password, 8) : undefined;

    const data = await prisma.client.update({
      where: { id },
      data: {
        profilePhoto: profilePhoto ?? '',
        name,
        email,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });

    const { password: _, ...userWithoutPassword } = data;
    const client = responseClientSchema.parse(userWithoutPassword);

    return client;
  }
}
