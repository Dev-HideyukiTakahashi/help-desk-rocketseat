import { compare, hash } from 'bcrypt';
import z from 'zod';
import { prisma } from '../config/prisma-config';
import {
  CreateClientPayload,
  responseClientSchema,
  UpdateClientPayload,
} from '../schema/client-schema';
import { AppError } from '../util/app-error';
import { UpdatePasswordPayload } from '../schema/user-schema';

export class ClientService {
  async create(payload: CreateClientPayload) {
    const { email, password, name } = payload;

    const hashedPassword = await hash(password, 8);

    const data = await prisma.client.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'CLIENT',
      },
    });

    const client = responseClientSchema.parse(data);

    return client;
  }

  async update(id: string, payload: UpdateClientPayload) {
    const { email, password, name, profilePhoto } = payload;
    const hashedPassword = password ? await hash(password, 8) : undefined;

    const data = await prisma.client.update({
      where: { id },
      data: {
        profilePhoto: profilePhoto ?? null,
        name,
        email,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });

    const client = responseClientSchema.parse(data);

    return client;
  }

  async index(page: number, perPage: number) {
    const responseArrayClientSchema = z.array(responseClientSchema);

    const skip = (page - 1) * perPage;

    const data = await prisma.client.findMany({
      skip,
      take: perPage,
      orderBy: { createdAt: 'desc' },
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

    const client = responseClientSchema.parse(data);

    return client;
  }

  async delete(id: string) {
    await prisma.client.delete({
      where: { id },
    });
  }

  async updatePassword(id: string, payload: UpdatePasswordPayload) {
    const user = await prisma.client.findUnique({
      where: { id },
    });

    if (!user) {
      throw new AppError('Usuario não encontrado', 404);
    }

    const isOldPasswordValid = await compare(payload.password, user.password);
    if (!isOldPasswordValid) {
      throw new AppError('Senha atual incorreta');
    }

    if (payload.newPassword.length < 6) {
      throw new AppError('Mínimo de 6 caracteres', 409);
    }

    const newPassword = await hash(payload.newPassword, 8);

    await prisma.client.update({ where: { id }, data: { password: newPassword } });

    return;
  }
}
