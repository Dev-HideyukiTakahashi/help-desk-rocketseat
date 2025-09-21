import { updateTechnicianSchema } from '../schema/technician-schema';
import { AdminService } from '../service/admin-service';
import { Request, Response } from 'express';

const adminService = new AdminService();

export class AdminController {
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const payload = updateTechnicianSchema.parse(request.body);
    const technician = await adminService.update(id, payload);

    return response.json(technician);
  }
}
