import { hash } from 'bcrypt';
import { prisma } from '../config/prisma-config';
import { CreateTechnicianPayload, responseTechnicianSchema } from '../schema/technician-schema';

export class TechnicianService {
  async create(payload: CreateTechnicianPayload) {
    const { email, password, name, profilePhoto } = payload;

    const hashedPassword = await hash(password, 8);

    const data = await prisma.technician.create({
      data: {
        profilePhoto: profilePhoto ?? '',
        user: {
          create: {
            email,
            password: hashedPassword,
            name,
            role: 'TECHNICIAN',
          },
        },
      },
      include: { user: true },
    });

    const technicianData = {
      ...data.user,
      profilePhoto: data.profilePhoto,
    };

    const { password: _, ...userWithoutPassword } = technicianData;
    const technician = responseTechnicianSchema.parse(userWithoutPassword);

    return technician;
  }
}
