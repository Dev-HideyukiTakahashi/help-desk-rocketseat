import { useState } from 'react';
import { useNavigate } from 'react-router';
import { formatCurrency } from '../utils/format-currency';
import { formatDate } from '../utils/format-date';
import { getInitials } from '../utils/get-name-initials';
import { TicketButton } from './TicketButton';
import { TicketStatus } from './TicketStatus';

type Props = {
  ticket: Ticket;
  handleUpdated: () => void;
};

export function TechnicianTicket({ ticket, handleUpdated }: Props) {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  function handleTicketUpdateError(message: string) {
    setError(message);

    setTimeout(() => {
      setError(null);
    }, 5000);
  }

  return (
    <div className="w-[336px] h-auto p-5 border-1 rounded-lg border-gray-500 ">
      <div className="flex place-content-between">
        <div className="flex flex-col mb-4">
          <span className="font-lato font-bold text-xs text-gray-400">
            {ticket.id.toString().padStart(5, '0')}
          </span>
          <span className="font-lato font-bold text-base text-gray-100">{ticket.title}</span>
          <span className="font-lato text-xs text-gray-200">{ticket.description}</span>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigate('/ticket', { state: ticket })}
              className="bg-gray-500 p-2 rounded-md cursor-pointer hover:text-gray-600 hover:bg-blue-dark"
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
            <TicketButton
              status={ticket.status}
              ticketId={ticket.id}
              handleError={handleTicketUpdateError}
              handleUpdated={handleUpdated}
            />
          </div>
        </div>
      </div>

      <div className="flex place-content-between font-lato text-xs text-gray-200">
        <span>{formatDate(ticket.createdAt)}</span>
        <span className="font-bold">
          {formatCurrency(
            ticket.services.reduce((acc, s) => acc + Number(s.value), Number(ticket.initialCost)),
          )}
        </span>
      </div>

      <div className="border-b-1 border-gray-500 my-4"></div>

      <div className="flex items-center">
        <div className="flex items-center gap-[6px] mr-auto text-gray-200">
          <span
            className="bg-blue-dark p-1 
                          font-lato text-xs text-gray-600
                          rounded-full flex justify-center items-center"
          >
            {getInitials(ticket.client.name)}
          </span>
          <p className="text-xs font-bold font-lato">{ticket.client.name}</p>
        </div>
        <TicketStatus status={ticket.status} isHidden={true} />
      </div>
      {error && <p className="font-lato font-bold text-sm text-feedback-danger shake">{error}</p>}
    </div>
  );
}
