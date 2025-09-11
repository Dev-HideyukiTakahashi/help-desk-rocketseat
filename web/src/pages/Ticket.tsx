import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Pagination } from '../components/Pagination';
import { TicketStatus } from '../components/TicketStatus';
import { api } from '../services/api';
import { formatCurrency } from '../utils/format-currency';
import { formatDate } from '../utils/format-date';
import { getInitials } from '../utils/get-name-initials';

const PER_PAGE = 8;

export function Ticket() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalOfPage, setTotalOfPage] = useState(0);
  const navigate = useNavigate();

  function handlePagination(action: 'next' | 'previous') {
    setPage((prevPage) => {
      if (action === 'next' && prevPage < totalOfPage) {
        return prevPage + 1;
      }
      if (action === 'previous' && prevPage > 1) {
        return prevPage - 1;
      }
      return prevPage;
    });
  }

  async function fetchTickets() {
    try {
      const { data } = await api.get<TicketAPIResponse>('/tickets', {
        params: {
          page,
          perPage: PER_PAGE,
        },
      });

      setTotalOfPage(data.pagination.totalPages);
      setTickets(data.tickets);
      setError(null);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message || 'Erro ao carregar técnicos.');
      }
    }
  }

  useEffect(() => {
    fetchTickets();
  }, [page]);
  return (
    <>
      <h1 className="text-blue-dark font-lato font-bold text-2xl mb-3 md:mb-7">Chamados</h1>

      {error && <p className="text-feedback-danger mb-3 font-lato text-sm">{error}</p>}

      <div className="border border-gray-500 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead
            className="text-gray-400 font-lato font-bold text-base
            border border-gray-500 text-left"
          >
            <tr>
              <th className="p-2 sm:p-4 text-sm">Atualizado em</th>
              <th className="p-2 sm:p-4 hidden md:table-cell">Id</th>
              <th className="p-2 sm:p-4 text-sm">Título e Serviço</th>
              <th className="p-2 sm:p-4 hidden md:table-cell">Valor total</th>
              <th className="p-2 sm:p-4 hidden md:table-cell">Cliente</th>
              <th className="p-2 sm:p-4 hidden md:table-cell">Técnico</th>
              <th className="p-2 sm:p-4 text-sm">Status</th>
              <th className="p-2 sm:p-4"></th>
            </tr>
          </thead>
          <tbody className="border border-gray-500">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border border-gray-500">
                <td className="p-2 sm:p-4 text-xs font-lato">{formatDate(ticket.updatedAt)}</td>
                <td className="p-2 sm:p-4 text-xs font-lato font-bold hidden md:table-cell">
                  {ticket.id.toString().padStart(5, '0')}
                </td>
                <td className="p-2 sm:p-4 font-lato">
                  <span className="font-bold text-sm max-w-[60px] sm:max-w-none truncate">
                    {ticket.title}
                  </span>
                  <p className="text-xs max-w-[60px] sm:max-w-none truncate">
                    {ticket.description}
                  </p>
                </td>
                <td className="p-2 sm:p-4 text-sm font-lato hidden md:table-cell">
                  {formatCurrency(
                    ticket.services.reduce(
                      (acc, s) => acc + Number(s.value),
                      Number(ticket.initialCost),
                    ),
                  )}
                </td>
                <td className="p-2 sm:p-4 font-lato hidden md:table-cell">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span
                      className="bg-blue-dark p-1 
                    font-lato text-xs text-gray-600
                    rounded-full flex justify-center items-center"
                    >
                      {getInitials(ticket.client.name)}
                    </span>
                    <p className="text-sm">{ticket.client.name}</p>
                  </div>
                </td>
                <td className="p-2 sm:p-4 font-lato hidden md:table-cell">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span
                      className="bg-blue-dark p-1 
                    font-lato text-xs text-gray-600
                    rounded-full flex justify-center items-center"
                    >
                      {getInitials(ticket.technician.name)}
                    </span>
                    <p className="text-sm hidden md:table-cell">{ticket.technician.name}</p>
                  </div>
                </td>
                <td className="p-2 sm:p-4">
                  <TicketStatus status={ticket.status} />
                </td>
                <td className="p-2 sm:p-4">
                  <button
                    onClick={() => navigate('/ticket', { state: ticket })}
                    className="bg-gray-500 p-2 sm:p-3 rounded-md cursor-pointer hover:text-gray-600 hover:bg-blue-dark"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M23.836 5.33366C23.4389 5.33366 23.0582 5.49138 22.7774 5.77211L6.76278 21.7868C6.60434 21.9451 6.48809 22.1411 6.42526 22.3561C6.42524 22.3562 6.42529 22.356 6.42526 22.3561L5.64855 25.0181L8.3105 24.2413L8.31117 24.2411C8.52652 24.1784 8.72257 24.0624 8.88118 23.9038L24.8945 7.8892C25.1752 7.60846 25.333 7.22766 25.333 6.83064C25.333 6.43361 25.1752 6.05285 24.8945 5.77211C24.6138 5.49138 24.233 5.33366 23.836 5.33366ZM20.8918 3.8865C21.6727 3.10566 22.7317 2.66699 23.836 2.66699C24.9402 2.66699 25.9993 3.10566 26.7801 3.8865C27.5609 4.66733 27.9996 5.72637 27.9996 6.83064C27.9996 7.93491 27.5609 8.99395 26.7801 9.77478L10.7668 25.7894C10.2912 26.265 9.70322 26.6131 9.05744 26.8013C9.05721 26.8013 9.05699 26.8014 9.05676 26.8015L5.22811 27.9186C4.88391 28.019 4.51892 28.025 4.17161 27.9361C3.8243 27.8471 3.50729 27.6664 3.25376 27.4129C3.00023 27.1593 2.81952 26.8423 2.73054 26.495C2.64156 26.1477 2.64758 25.7828 2.74797 25.4386L3.86534 21.6092C4.05375 20.964 4.40179 20.3764 4.87716 19.9012C4.87707 19.9012 4.87725 19.9011 4.87716 19.9012L20.8918 3.8865ZM14.6666 26.6666C14.6666 25.9303 15.2636 25.3333 16 25.3333H28C28.7363 25.3333 29.3333 25.9303 29.3333 26.6666C29.3333 27.403 28.7363 28 28 28H16C15.2636 28 14.6666 27.403 14.6666 26.6666Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        current={page}
        total={totalOfPage}
        onNext={() => handlePagination('next')}
        onPrevious={() => handlePagination('previous')}
      />
    </>
  );
}
