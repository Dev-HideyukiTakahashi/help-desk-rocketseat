import { hash } from 'bcrypt';
import z from 'zod';
import { prisma } from '../config/prisma-config';
import {
  CreateTechnicianPayload,
  responseTechnicianSchema,
  UpdateTechnicianPayload,
} from '../schema/technician-schema';

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

  async update(id: string, payload: UpdateTechnicianPayload) {
    const { email, password, name, profilePhoto, availability } = payload;
    const hashedPassword = password ? await hash(password, 8) : undefined;

    const data = await prisma.technician.update({
      where: { id },
      data: {
        name,
        email,
        ...(hashedPassword && { password: hashedPassword }),
        profilePhoto: profilePhoto ?? '',
        availability: {
          deleteMany: {},
          create: availability.map((time) => ({ time })),
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
      orderBy: { createdAt: 'asc' },
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
}
