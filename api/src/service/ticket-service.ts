import { prisma } from '../config/prisma-config';
import { CreateTicketPayload, responseTicketSchema } from '../schema/ticket-schema';
import { getTechnicianWithLessOpenTickets } from '../util/assign-technician';

export class TicketService {
  async create(payload: CreateTicketPayload) {
    const { title, description, clientId, services } = payload;
    const technicianId = await getTechnicianWithLessOpenTickets();

    const data = await prisma.ticket.create({
      data: {
        title,
        description,
        client: { connect: { id: clientId } },
        technician: { connect: { id: technicianId } },
        services: { connect: services.map((serviceId: string) => ({ id: serviceId })) },
      },
      include: {
        client: true,
        technician: true,
        services: true,
      },
    });

    const ticket = responseTicketSchema.parse(data);

    return ticket;
  }
}
