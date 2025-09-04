import z from 'zod';
import { prisma } from '../config/prisma-config';
import {
  CreateServicePayload,
  responseServiceSchema,
  UpdateServicePayload,
} from '../schema/service-schema';

export class ServiceService {
  async create(payload: CreateServicePayload) {
    const data = await prisma.service.create({
      data: payload,
    });

    return responseServiceSchema.parse(data);
  }

  async update(id: string, payload: UpdateServicePayload) {
    const data = await prisma.service.update({
      where: { id },
      data: payload,
    });

    return responseServiceSchema.parse(data);
  }

  async index() {
    const responseServiceArraySchema = z.array(responseServiceSchema);
    const data = await prisma.service.findMany();

    return responseServiceArraySchema.parse(data);
  }
}
