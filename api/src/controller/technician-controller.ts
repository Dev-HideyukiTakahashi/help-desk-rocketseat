import { Request, Response } from 'express';
import { createTechnicianSchema } from '../schema/technician-schema';
import { TechnicianService } from '../service/technician-service';

const technicianService = new TechnicianService();

export class TechnicianController {
  async create(request: Request, response: Response) {
    const payload = createTechnicianSchema.parse(request.body);
    const technician = await technicianService.create(payload);

    return response.status(201).json(technician);
  }
}
