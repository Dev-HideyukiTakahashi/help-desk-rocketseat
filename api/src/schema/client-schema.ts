import z from 'zod';

export const createClientSchema = z.object({
  email: z.email({ message: 'Informe um email válido' }),
  password: z.string().min(6, { message: 'Mínimo de 6 caracteres.' }),
  name: z.string().min(2, { message: 'Informe um nome válido.' }),
  profilePhoto: z.string().nullable().optional(),
});

export type CreateClientPayload = z.infer<typeof createClientSchema>;

export const updateClientSchema = z.object({
  email: z.email({ message: 'Informe um email válido' }),
  password: z.string().min(6, { message: 'Mínimo de 6 caracteres.' }).optional(),
  name: z.string().min(2, { message: 'Informe um nome válido.' }),
  profilePhoto: z.string().nullable().optional(),
});

export type UpdateClientPayload = z.infer<typeof updateClientSchema>;

export const responseClientSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string(),
  role: z.string(),
  profilePhoto: z.string().nullable().optional(),
});
