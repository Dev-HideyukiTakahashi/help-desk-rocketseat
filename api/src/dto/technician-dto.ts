import z from 'zod';
import { UserDTO } from './user-dto';

export const TechnicianDTO = UserDTO.extend({
  profilePhoto: z.string(),
});

export type TechnicianDTOSchema = z.infer<typeof TechnicianDTO>;
