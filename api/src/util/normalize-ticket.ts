import { Service } from '@prisma/client';

export function normalizeTickets(tickets: any[]) {
  return tickets.map((ticket) => ({
    ...ticket,
    initialCost: ticket.initialCost?.toNumber() ?? null,
    services: ticket.services.map((service: Service & { value: any }) => ({
      ...service,
      value: service.value?.toNumber() ?? null,
    })),
  }));
}
