import { useActionState, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { TicketStatus } from '../components/TicketStatus';
import { useAuth } from '../hooks/useAuth';
import { formatCurrency } from '../utils/format-currency';
import { formatDate } from '../utils/format-date';
import { getInitials } from '../utils/get-name-initials';

export function TicketDetails() {
  const navigate = useNavigate();
  const [state, formAction, isLoading] = useActionState(handleSubmit, null);
  const [error, setError] = useState<string | null>(null);
  const [ticket, setTicket] = useState<Ticket>();

  const { session } = useAuth();
  const role = session?.user.role;

  const location = useLocation();

  async function handleSubmit(_: any, formData: FormData) {}

  useEffect(() => {
    setTicket(location.state as Ticket);
    const timerId = setTimeout(() => {
      if (!ticket) {
        navigate(-1);
      }
    }, 5000);

    return () => clearTimeout(timerId);
  }, [ticket]);

  if (!ticket) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-end place-content-between md:mb-7">
        <div>
          <div className="font-lato text-gray-300 mb-1">
            <button
              className="flex items-center gap-2 pl-1 cursor-pointer hover:text-gray-100"
              onClick={() => navigate(-1)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.9428 5.72378C17.4635 6.24448 17.4635 7.0887 16.9428 7.60939L9.8856 14.6666H25.3333C26.0697 14.6666 26.6666 15.2635 26.6666 15.9999C26.6666 16.7363 26.0697 17.3333 25.3333 17.3333H9.8856L16.9428 24.3904C17.4635 24.9111 17.4635 25.7554 16.9428 26.2761C16.4221 26.7968 15.5779 26.7968 15.0572 26.2761L5.72384 16.9427C5.20314 16.422 5.20314 15.5778 5.72384 15.0571L15.0572 5.72378C15.5779 5.20308 16.4221 5.20308 16.9428 5.72378Z"
                  fill="currentColor"
                />
              </svg>
              Voltar
            </button>
          </div>
          <h1 className="text-blue-dark font-lato font-bold text-2xl">Chamado detalhado</h1>
        </div>

        {role === 'ADMIN' && (
          <div className="flex gap-2">
            {ticket?.status !== 'CLOSED' && (
              <Button
                variantStyle="light"
                variantSize="confirmWindow"
                className="flex items-center justify-center gap-2 text-gray-200"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-300"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 3.99992C9.37262 3.99992 4.00004 9.3725 4.00004 15.9999C4.00004 22.6273 9.37262 27.9999 16 27.9999C22.6275 27.9999 28 22.6273 28 15.9999C28 9.3725 22.6275 3.99992 16 3.99992ZM1.33337 15.9999C1.33337 7.89974 7.89986 1.33325 16 1.33325C24.1002 1.33325 30.6667 7.89974 30.6667 15.9999C30.6667 24.1001 24.1002 30.6666 16 30.6666C7.89986 30.6666 1.33337 24.1001 1.33337 15.9999ZM16 6.66659C16.7364 6.66659 17.3334 7.26354 17.3334 7.99992V13.8425L20.7371 12.1407C21.3957 11.8114 22.1966 12.0783 22.5259 12.737C22.8553 13.3956 22.5883 14.1965 21.9297 14.5258L16.5963 17.1925C16.183 17.3991 15.6922 17.3771 15.2991 17.1341C14.906 16.8912 14.6667 16.462 14.6667 15.9999V7.99992C14.6667 7.26354 15.2637 6.66659 16 6.66659Z"
                    fill="currentColor"
                  />
                </svg>
                Em atendimento
              </Button>
            )}

            {ticket?.status === 'CLOSED' && (
              <Button
                variantStyle="light"
                variantSize="confirmWindow"
                className="flex items-center justify-center gap-2 text-gray-200"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22.0003 5.60162C19.6228 4.22985 16.8469 3.71459 14.1356 4.14176C11.4242 4.56893 8.94119 5.91272 7.10067 7.94902C5.26014 9.98533 4.17333 12.5911 4.02148 15.3317C3.86963 18.0723 4.66192 20.7822 6.26622 23.0093C7.87051 25.2365 10.1898 26.8464 12.8374 27.5705C15.485 28.2946 18.3008 28.0891 20.8153 26.9884C23.3298 25.8877 25.3909 23.9582 26.6549 21.5218C27.9189 19.0853 28.3095 16.2892 27.7615 13.5996C27.6145 12.8781 28.0802 12.1739 28.8018 12.0269C29.5233 11.8799 30.2274 12.3456 30.3745 13.0672C31.0443 16.3544 30.5669 19.7719 29.022 22.7498C27.477 25.7277 24.9579 28.0859 21.8847 29.4313C18.8115 30.7766 15.3699 31.0277 12.134 30.1427C8.89802 29.2577 6.06327 27.29 4.10246 24.5679C2.14165 21.8458 1.1733 18.5338 1.3589 15.1842C1.54449 11.8345 2.87281 8.64972 5.12235 6.16091C7.37188 3.67209 10.4066 2.02969 13.7206 1.50759C17.0345 0.985487 20.4272 1.61525 23.333 3.29185C23.9708 3.65987 24.1895 4.47527 23.8215 5.11309C23.4535 5.75091 22.6381 5.96963 22.0003 5.60162ZM30.2761 4.39059C30.7968 4.91129 30.7968 5.75551 30.2761 6.27621L16.9428 19.6095C16.4221 20.1302 15.5779 20.1302 15.0572 19.6095L11.0572 15.6095C10.5365 15.0888 10.5365 14.2446 11.0572 13.7239C11.5779 13.2032 12.4221 13.2032 12.9428 13.7239L16 16.7811L28.3905 4.39059C28.9112 3.86989 29.7554 3.86989 30.2761 4.39059Z"
                    fill="black"
                  />
                </svg>
                Encerrado
              </Button>
            )}
          </div>
        )}
      </div>

      <form action={formAction} className="flex flex-col md:flex-row gap-8" id="technician-form">
        <div className="w-full md:w-2/3 border border-gray-500 p-6 rounded-lg flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center place-content-between ">
              <p className="text-gray-300 font-lato font-bold text-xs">
                {ticket.id.toString().padStart(5, '0')}
              </p>
              <TicketStatus status={ticket.status} />
            </div>
            <h1 className="text-gray-200 text-base font-lato font-bold">{ticket.title}</h1>
          </div>
          <div>
            <span className="text-gray-400 font-lato font-bold text-xs">Descrição</span>
            <p className="text-gray-200 font-lato text-sm">{ticket.description}</p>
          </div>
          <div>
            <span className="text-gray-400 font-lato font-bold text-xs">Categoria</span>
            <p className="text-gray-200 font-lato text-sm">{ticket.services[0].title}</p>
          </div>
          <div className="flex gap-12 md:gap-32">
            <div>
              <span className="text-gray-400 font-lato font-bold text-xs">Criado em</span>
              <p className="text-gray-200 font-lato text-sm">{formatDate(ticket.createdAt)}</p>
            </div>
            <div>
              <span className="text-gray-400 font-lato font-bold text-xs">Atualizado em</span>
              <p className="text-gray-200 font-lato text-sm">{formatDate(ticket.updatedAt)}</p>
            </div>
          </div>
          <div>
            <span className="text-gray-400 font-lato font-bold text-xs">Cliente</span>
            <div className="flex gap-2 items-center mt-2">
              <span
                className="bg-blue-dark w-[20px] h-[20px] 
                    font-lato text-[9px] text-gray-600
                    rounded-full flex justify-center items-center"
              >
                {getInitials(ticket.client.name)}
              </span>
              <span>{ticket.client.name}</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 border h-fit border-gray-500 p-6 rounded-lg flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-gray-400 font-lato font-bold text-xs mb-2">
              Técnico responsável
            </span>
            <div className="flex gap-2 mb-7">
              <span
                className="bg-blue-dark w-[2rem] h-[2rem]
                    font-lato text-xs text-gray-600
                    rounded-full flex justify-center items-center"
              >
                {getInitials(ticket.technician.name)}
              </span>
              <div className="flex flex-col">
                <span className="text-gray-200 font-lato text-sm">{ticket.technician.name}</span>
                <span className="text-gray-400 font-lato font-bold text-xs">
                  {ticket.technician.email}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <span className="text-gray-400 font-lato font-bold text-xs">Valores</span>
              <div className="text-gray-200 font-lato text-xs flex place-content-between">
                <span>Preço base</span>
                <span>{formatCurrency(ticket.initialCost)}</span>
              </div>
            </div>
            <div className="mb-4">
              <span className="text-gray-400 font-lato font-bold text-xs">Adicionais</span>
              {ticket.services.map((service) => (
                <div className="flex place-content-between">
                  <p className="text-gray-200 font-lato text-xs">{service.title}</p>
                  <p className="text-gray-200 font-lato text-xs">{formatCurrency(service.value)}</p>
                </div>
              ))}
            </div>
            <div>
              <div className="border-t-1 border-gray-500">
                <div className="text-gray-200 font-lato font-bold text-sm flex place-content-between mt-2">
                  <span>Total</span>
                  <span>
                    {formatCurrency(
                      ticket.services.reduce(
                        (acc, s) => acc + Number(s.value),
                        Number(ticket.initialCost),
                      ),
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {error && <p className="text-feedback-danger mt-4 font-lato text-sm">{error}</p>}
        </div>
      </form>
    </div>
  );
}
