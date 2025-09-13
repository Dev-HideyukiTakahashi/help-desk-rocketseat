import z from 'zod';

export const paginationSchema = z.object({
  page: z.coerce.number().optional().default(1),
  perPage: z.coerce.number().optional().default(8),
});
