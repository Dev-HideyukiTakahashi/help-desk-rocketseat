import { Request, Response } from 'express';
import { createTicketSchema } from '../schema/ticket-schema';
import { TicketService } from '../service/ticket-service';

const taskService = new TicketService();

export class TicketController {
  async create(request: Request, response: Response) {
    const payload = createTicketSchema.parse(request.body);
    const ticket = await taskService.create(payload);

    return response.json(ticket);
  }
}
