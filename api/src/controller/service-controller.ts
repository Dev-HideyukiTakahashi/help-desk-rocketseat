import { Request, Response } from 'express';
import { createServiceSchema, updateServiceSchema } from '../schema/service-schema';
import { ServiceService } from '../service/service-service';

const serviceService = new ServiceService();

export class ServiceController {
  async create(request: Request, response: Response) {
    const payload = createServiceSchema.parse(request.body);
    const service = await serviceService.create(payload);

    return response.status(201).json(service);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const payload = updateServiceSchema.parse(request.body);
    const service = await serviceService.update(id, payload);

    return response.json(service);
  }

  async index(request: Request, response: Response) {
    const services = await serviceService.index();

    return response.json(services);
  }
}
