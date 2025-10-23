import { hash } from 'bcrypt';
import {
  responseTechnicianSchema,
  UpdateTechnicianByAdminPayload,
} from '../schema/technician-schema';
import { prisma } from '../config/prisma-config';

export class AdminService {
  async update(id: string, payload: UpdateTechnicianByAdminPayload) {
    const { email, password, name, profilePhoto, availability } = payload;
    const hashedPassword = password ? await hash(password, 8) : undefined;

    const data = await prisma.technician.update({
      where: { id },
      data: {
        name,
        email,
        ...(hashedPassword && { password: hashedPassword }),
        profilePhoto: profilePhoto ?? '',
        availability: {
          deleteMany: {},
          create: availability.sort((a, b) => a.getTime() - b.getTime()).map(time => ({ time })),
        },
      },
      include: { availability: true },
    });

    const { password: _, ...userWithoutPassword } = data;
    const technician = responseTechnicianSchema.parse({
      ...userWithoutPassword,
      availability: userWithoutPassword.availability.map(a => a.time),
    });

    return technician;
  }
}
