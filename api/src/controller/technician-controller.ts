import { Request, Response } from 'express';
import { TechnicianService } from '../service/technician-service';

const technicianService = new TechnicianService();

export class TechnicianController {
  async create(request: Request, response: Response) {
    const data = await technicianService.create();
    return response.json({ data });
  }
}
