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

  async index(page: number, perPage: number) {
    const responseServiceArraySchema = z.array(responseServiceSchema);

    const skip = (page - 1) * perPage;

    const data = await prisma.service.findMany({
      skip,
      take: perPage,
      orderBy: { createdAt: 'desc' },
    });

    const totalRecords = await prisma.service.count();
    const totalPages = Math.ceil(totalRecords / perPage);
    const pagination = {
      page,
      perPage,
      totalRecords,
      totalPages: totalPages > 0 ? totalPages : 1,
    };

    const services = responseServiceArraySchema.parse(data);

    return { services, pagination };
  }
}
