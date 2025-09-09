import { prisma } from '../config/prisma-config';
import { AppError } from './app-error';

/**
 * Retorna o ID do técnico com menos tickets no status 'OPEN'.
 * Caso haja empate, escolhe aleatoriamente entre os técnicos com menos tickets.
 */
export async function getTechnicianWithLessOpenTickets(): Promise<string> {
  // Selecionamos apenas o 'id'
  const technicians = await prisma.technician.findMany({
    select: { id: true },
  });

  if (technicians.length === 0) {
    throw new AppError('Nenhum técnico disponível');
  }

  // `groupBy` retorna um array com cada técnicoId e a quantidade de tickets abertos
  const tickets = await prisma.ticket.groupBy({
    by: ['technicianId'],
    where: { status: 'OPEN' },
    _count: { technicianId: true },
  });

  // Criar um mapa para acessar rapidamente a quantidade de tickets abertos de cada técnico
  // Chave: technicianId, Valor: quantidade de tickets abertos
  const ticketCountMap = new Map<string, number>();
  tickets.forEach((t: any) => {
    ticketCountMap.set(t.technicianId, t._count.technicianId);
  });

  let minCount = Infinity;
  let selectedTechnicians: string[] = [];

  technicians.forEach((t: any) => {
    // Pegar a quantidade de tickets abertos do técnico atual, ou 0 se não tiver nenhum
    const count = ticketCountMap.get(t.id) ?? 0;

    if (count < minCount) {
      // Encontramos um novo mínimo
      minCount = count;
      selectedTechnicians = [t.id]; // reiniciamos o array com este técnico
    } else if (count === minCount) {
      // Se o técnico tiver o mesmo número de tickets que o mínimo, adicionamos ao array
      selectedTechnicians.push(t.id);
    }
  });

  // Quebrar empate aleatoriamente
  // Se houver mais de um técnico com o mesmo número mínimo de tickets, escolhemos aleatoriamente
  const randomIndex = Math.floor(Math.random() * selectedTechnicians.length);
  return selectedTechnicians[randomIndex];
}
