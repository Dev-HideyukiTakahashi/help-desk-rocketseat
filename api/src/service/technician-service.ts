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

  async index() {
    const responseTechnicianArraySchema = z.array(responseTechnicianSchema);
    const data = await prisma.technician.findMany({
      include: { availability: true },
    });

    const technicians = data.map((tech) => ({
      ...tech,
      availability: tech.availability.map((a) => a.time),
    }));

    return responseTechnicianArraySchema.parse(technicians);
  }
}
