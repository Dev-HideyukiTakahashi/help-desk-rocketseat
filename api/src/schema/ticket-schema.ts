import z from 'zod';

export const createTicketSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  description: z.string().min(5, 'Descrição deve ter pelo menos 5 caracteres'),
  services: z
    .array(z.uuid('Id do serviço inválido'))
    .min(1, 'É necessário selecionar ao menos um serviço')
    .max(1, 'Somente um serviço pode ser selecionado no momento'),
});

export type CreateTicketPayload = z.infer<typeof createTicketSchema>;

export const responseTicketSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  initialCost: z.number(),
  client: z.object({
    id: z.uuid(),
    name: z.string(),
  }),
  technician: z.object({
    id: z.uuid(),
    name: z.string(),
  }),
  services: z.array(
    z.object({
      id: z.uuid(),
      title: z.string(),
      value: z.number(),
    }),
  ),
  status: z.enum(['OPEN', 'PROCESSING', 'CLOSED']),
  createdAt: z.date(),
  updatedAt: z.date(),
});
