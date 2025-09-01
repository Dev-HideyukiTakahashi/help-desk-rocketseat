import { hash } from 'bcrypt';
import { prisma } from '../config/prisma-config';
import { ClientDTO } from '../dto/client-dto';
import { CreateClientPayload } from '../schema/client-schema';

export class ClientService {
  async create(payload: CreateClientPayload) {
    const { email, password, name, profilePhoto } = payload;

    const hashedPassword = await hash(password, 8);

    const data = await prisma.client.create({
      data: {
        profilePhoto: profilePhoto ?? '',
        user: {
          create: {
            name,
            email,
            password: hashedPassword,
            role: 'CLIENT',
          },
        },
      },
      include: { user: true },
    });

    const clientData = {
      ...data.user,
      profilePhoto: data.profilePhoto,
    };

    const { password: _, ...userWithoutPassword } = clientData;
    const client = ClientDTO.parse(userWithoutPassword);

    return client;
  }
}
