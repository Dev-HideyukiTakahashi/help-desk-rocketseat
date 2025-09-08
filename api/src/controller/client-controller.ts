import { Request, Response } from 'express';
import { createClientSchema, updateClientSchema } from '../schema/client-schema';
import { ClientService } from '../service/client-service';

const clientService = new ClientService();

export class ClientController {
  async create(request: Request, response: Response) {
    const payload = createClientSchema.parse(request.body);
    const client = await clientService.create(payload);

    return response.status(201).json(client);
  }

  async update(request: Request, response: Response) {
    const payload = updateClientSchema.parse(request.body);
    const { id } = request.params;
    const client = await clientService.update(id, payload);

    return response.json(client);
  }
}
