import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { TechnicianTicket } from '../components/TechnicianTicket';
import { TicketStatus } from '../components/TicketStatus';
import { api } from '../services/api';

export function TechnicianDashboard() {
  const [error, setError] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  async function fetchTickets() {
    try {
      const { data } = await api.get<TicketAPIResponse>('/tickets');

      setTickets(data.tickets);
      setError(null);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message || 'Erro ao carregar tickets.');
      }
    }
  }

  function handleUpdated() {
    fetchTickets();
  }

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <>
      <h1 className="text-blue-dark font-lato font-bold text-2xl mb-3 md:mb-7">Meus chamados</h1>

      {error && <p className="text-feedback-danger mb-3 font-lato text-sm">{error}</p>}

      <div className="flex flex-col gap-4 mb-6">
        <TicketStatus status="PROCESSING" />

        <div className="flex gap-4 flex-wrap">
          {tickets
            .filter((ticket) => ticket.status === 'PROCESSING')
            .map((ticket) => (
              <TechnicianTicket key={ticket.id} ticket={ticket} handleUpdated={handleUpdated} />
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <TicketStatus status="OPEN" />
        <div className="flex gap-4 flex-wrap">
          {tickets
            .filter((ticket) => ticket.status === 'OPEN')
            .map((ticket) => (
              <TechnicianTicket key={ticket.id} ticket={ticket} handleUpdated={handleUpdated} />
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <TicketStatus status="CLOSED" />
        <div className="flex gap-4 flex-wrap">
          {tickets
            .filter((ticket) => ticket.status === 'CLOSED')
            .map((ticket) => (
              <TechnicianTicket key={ticket.id} ticket={ticket} handleUpdated={handleUpdated} />
            ))}
        </div>
      </div>
    </>
  );
}
