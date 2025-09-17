import z from 'zod';

export const responseUserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string(),
  role: z.string(),
  profilePhoto: z.url().optional().nullable(),
});
