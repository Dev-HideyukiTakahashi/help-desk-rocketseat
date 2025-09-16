import { Request, Response } from 'express';
import z from 'zod';
import { paginationSchema } from '../schema/pagination-schema';
import { createTicketSchema } from '../schema/ticket-schema';
import { TicketService } from '../service/ticket-service';

const ticketService = new TicketService();

export class TicketController {
  async create(request: Request, response: Response) {
    const payload = createTicketSchema.parse(request.body);
    const { user } = request;
    const ticket = await ticketService.create(payload, user);

    return response.status(201).json(ticket);
  }

  async index(request: Request, response: Response) {
    const { page, perPage } = paginationSchema.parse(request.query);
    const { user } = request;
    const tickets = await ticketService.index(page, perPage, user);

    return response.json(tickets);
  }

  async updateStatus(request: Request, response: Response) {
    const idSchema = z.coerce.number({ message: 'Id de chamado inválido' });
    const id = idSchema.parse(request.params.id);

    const statusSchema = z.enum(['OPEN', 'PROCESSING', 'CLOSED']);
    const status = statusSchema.parse(request.body.status);

    const ticket = await ticketService.updateStatus(id, status);

    return response.json(ticket);
  }
  async updateServices(request: Request, response: Response) {
    const idSchema = z.coerce.number({ message: 'Id de chamado inválido' });
    const id = idSchema.parse(request.params.id);

    const { serviceId } = request.body;
    const ticket = await ticketService.updateServices(id, serviceId);

    return response.json(ticket);
  }
}
