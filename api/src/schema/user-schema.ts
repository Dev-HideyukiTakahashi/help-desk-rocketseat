import z from 'zod';

export const responseUserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string(),
  role: z.string(),
  profilePhoto: z.string().nullable().optional(),
});

export const updatePasswordSchema = z.object({
  password: z.string(),
  newPassword: z.string(),
});

export type UpdatePasswordPayload = z.infer<typeof updatePasswordSchema>;
