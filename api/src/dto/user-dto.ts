import z from 'zod';

export const UserDTO = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string(),
  role: z.string(),
});

export type UserDTOSchema = z.infer<typeof UserDTO>;
