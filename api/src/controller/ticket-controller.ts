import { Request, Response } from 'express';
import { paginationSchema } from '../schema/pagination-schema';
import { createTicketSchema } from '../schema/ticket-schema';
import { TicketService } from '../service/ticket-service';

const taskService = new TicketService();

export class TicketController {
  async create(request: Request, response: Response) {
    const payload = createTicketSchema.parse(request.body);
    const ticket = await taskService.create(payload);

    return response.status(201).json(ticket);
  }

  async index(request: Request, response: Response) {
    const { page, perPage } = paginationSchema.parse(request.query);
    const { user } = request;
    const tickets = await taskService.index(page, perPage, user);

    return response.json(tickets);
  }
}
