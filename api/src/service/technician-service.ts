import { compare, hash } from 'bcrypt';
import z from 'zod';
import { prisma } from '../config/prisma-config';
import {
  CreateTechnicianPayload,
  responseTechnicianSchema,
  UpdateTechnicianPayload,
  updateTechnicianSchema,
} from '../schema/technician-schema';
import { AppError } from '../util/app-error';
import { UpdatePasswordPayload } from '../schema/user-schema';

export class TechnicianService {
  async create(payload: CreateTechnicianPayload) {
    const { email, password, name, availability } = payload;

    const hashedPassword = await hash(password, 8);

    const data = await prisma.technician.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'TECHNICIAN',
        profilePhoto: '',
        availability: {
          create: availability.map((time) => ({ time })), // cria vários horários
        },
      },
      include: { availability: true },
    });

    const { password: _, ...userWithoutPassword } = data;
    const technician = responseTechnicianSchema.parse({
      ...userWithoutPassword,
      availability: userWithoutPassword.availability.map((a) => a.time),
    });

    return technician;
  }

  async index(page: number, perPage: number) {
    const responseTechnicianArraySchema = z.array(responseTechnicianSchema);

    const skip = (page - 1) * perPage;

    const data = await prisma.technician.findMany({
      skip,
      take: perPage,
      orderBy: { createdAt: 'desc' },
      include: { availability: true },
    });

    const totalRecords = await prisma.technician.count();
    const totalPages = Math.ceil(totalRecords / perPage);
    const pagination = {
      page,
      perPage,
      totalRecords,
      totalPages: totalPages > 0 ? totalPages : 1,
    };

    const list = data.map((tech) => ({
      ...tech,
      availability: tech.availability.map((a) => a.time),
    }));
    const technicians = responseTechnicianArraySchema.parse(list);

    return { technicians, pagination };
  }

  async update(id: string, payload: UpdateTechnicianPayload) {
    const { email, name, profilePhoto } = payload;

    const data = await prisma.technician.update({
      where: { id },
      data: {
        profilePhoto: profilePhoto ?? null,
        name,
        email,
      },
    });

    const technician = updateTechnicianSchema.parse(data);

    return technician;
  }

  async updatePassword(id: string, payload: UpdatePasswordPayload) {
    const user = await prisma.technician.findUnique({
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

    await prisma.technician.update({ where: { id }, data: { password: newPassword } });

    return;
  }
}
