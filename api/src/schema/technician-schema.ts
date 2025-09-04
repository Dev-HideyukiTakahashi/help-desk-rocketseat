import z from 'zod';

export const createTechnicianSchema = z.object({
  email: z.email({ message: 'Informe um email válido' }),
  password: z.string().min(6, { message: 'Mínimo de 6 caracteres.' }),
  name: z.string().min(2, { message: 'Informe um nome válido.' }),
  profilePhoto: z.string().optional(),
  availability: z.array(z.coerce.date()).nonempty({ message: 'Informe pelo menos um horário' }),
});

export type CreateTechnicianPayload = z.infer<typeof createTechnicianSchema>;

export const updateTechnicianSchema = z.object({
  email: z.email({ message: 'Informe um email válido' }),
  password: z.string().min(6, { message: 'Mínimo de 6 caracteres.' }).optional(),
  name: z.string().min(2, { message: 'Informe um nome válido.' }),
  profilePhoto: z.string().optional(),
  availability: z.array(z.coerce.date()).nonempty({ message: 'Informe pelo menos um horário' }),
});
export type UpdateTechnicianPayload = z.infer<typeof updateTechnicianSchema>;

export const responseTechnicianSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string(),
  role: z.string(),
  availability: z.array(z.coerce.date()),
});
