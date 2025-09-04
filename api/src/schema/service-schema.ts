import z from 'zod';

export const createServiceSchema = z.object({
  title: z.string().trim().min(2, { message: 'Informe um título válido' }),
  value: z.coerce
    .number({ message: 'Informe um valor válido' })
    .positive({ message: 'O valor deve ser positivo' }),
});

export type CreateServicePayload = z.infer<typeof createServiceSchema>;

export const updateServiceSchema = z.object({
  title: z.string().trim().min(2, { message: 'Informe um título válido' }).optional(),
  value: z.coerce
    .number({ message: 'Informe um valor válido' })
    .positive({ message: 'O valor deve ser positivo' })
    .optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export type UpdateServicePayload = z.infer<typeof updateServiceSchema>;

export const responseServiceSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  value: z.coerce.number(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
});
