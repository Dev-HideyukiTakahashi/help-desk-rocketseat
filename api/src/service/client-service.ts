import { hash } from 'bcrypt';
import z from 'zod';
import { prisma } from '../config/prisma-config';
import {
  CreateClientPayload,
  responseClientSchema,
  UpdateClientPayload,
} from '../schema/client-schema';
import { AppError } from '../util/app-error';

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

  async index(page: number, perPage: number) {
    const responseArrayClientSchema = z.array(responseClientSchema);

    const skip = (page - 1) * perPage;

    const data = await prisma.client.findMany({
      skip,
      take: perPage,
      orderBy: { createdAt: 'asc' },
    });

    const totalRecords = await prisma.client.count();
    const totalPages = Math.ceil(totalRecords / perPage);
    const pagination = {
      page,
      perPage,
      totalRecords,
      totalPages: totalPages > 0 ? totalPages : 1,
    };

    const clients = responseArrayClientSchema.parse(data);

    return { clients, pagination };
  }

  async show(id: string) {
    const data = await prisma.client.findUnique({
      where: { id },
    });

    if (!data) {
      throw new AppError('Cliente não localizado', 404);
    }

    const { password: _, ...userWithoutPassword } = data;

    return userWithoutPassword;
  }
}
