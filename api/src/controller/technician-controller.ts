import { Request, Response } from 'express';
import { createTechnicianSchema, updateTechnicianSchema } from '../schema/technician-schema';
import { TechnicianService } from '../service/technician-service';

const technicianService = new TechnicianService();

export class TechnicianController {
  async create(request: Request, response: Response) {
    const payload = createTechnicianSchema.parse(request.body);
    const technician = await technicianService.create(payload);

    return response.status(201).json(technician);
  }
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const payload = updateTechnicianSchema.parse(request.body);
    const technician = await technicianService.update(id, payload);

    return response.json(technician);
  }

  async index(request: Request, response: Response) {
    const technicians = await technicianService.index();

    return response.json(technicians);
  }
}
