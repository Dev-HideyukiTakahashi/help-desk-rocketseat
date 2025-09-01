import z from 'zod';
import { UserDTO } from './user-dto';

export const ClientDTO = UserDTO.extend({
  profilePhoto: z.string(),
});

export type ClientDTOSchema = z.infer<typeof ClientDTO>;
