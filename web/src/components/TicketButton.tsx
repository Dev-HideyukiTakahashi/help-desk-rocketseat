import { AxiosError } from 'axios';
import { useState, type ComponentProps } from 'react';
import { ZodError } from 'zod';
import { api } from '../services/api';
import { ConfirmationModal } from './ConfirmationModal';

type Props = ComponentProps<'button'> & {
  status: 'OPEN' | 'PROCESSING' | 'CLOSED';
  ticketId: string;
  handleError: (errorMessage: string) => void;
  handleUpdated: () => void;
};

export function TicketButton({ status, ticketId, handleError, handleUpdated, ...rest }: Props) {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  let buttonText = '';
  let modalMessage = '';

  if (status === 'CLOSED') {
    return;
  }

  if (status === 'PROCESSING') {
    buttonText = 'Encerrar';
    modalMessage = 'Deseja encerrar chamado?';
  } else if (status === 'OPEN') {
    buttonText = 'Iniciar';
    modalMessage = 'Deseja iniciar chamado?';
  }

  function handleClickModal() {
    setIsConfirmationModalOpen(true);
  }

  function handleCloseConfirmationModal() {
    setIsConfirmationModalOpen(false);
  }

  function handleConfirmModal() {
    if (status === 'PROCESSING') {
      handleCloseTicket();
    } else if (status === 'OPEN') {
      handleOpenTicket();
    }
  }

  async function handleOpenTicket() {
    try {
      await api.patch(`/tickets/${ticketId}`, { status: 'PROCESSING' });
      handleCloseConfirmationModal();
      handleUpdated();
    } catch (error) {
      let errorMessage = 'Ocorreu um erro inesperado.';

      if (error instanceof ZodError) {
        errorMessage = error.issues[0].message || 'Erro de validação';
      } else if (error instanceof AxiosError) {
        errorMessage = error.response?.data.message || 'Erro de rede';
      }

      handleError(errorMessage);
    }
  }

  async function handleCloseTicket() {
    try {
      await api.patch(`/tickets/${ticketId}`, { status: 'CLOSED' });
      handleCloseConfirmationModal();
      handleUpdated();
    } catch (error) {
      let errorMessage = 'Ocorreu um erro inesperado.';

      if (error instanceof ZodError) {
        errorMessage = error.issues[0].message || 'Erro de validação';
      } else if (error instanceof AxiosError) {
        errorMessage = error.response?.data.message || 'Erro de rede';
      }

      handleError(errorMessage);
    }
  }

  return (
    <>
      <button
        onClick={handleClickModal}
        className="font-lato font-bold text-xs text-gray-600 bg-gray-200 rounded-md 
    flex items-center gap-2 p-2 cursor-pointer"
        {...rest}
      >
        {status === 'PROCESSING' && (
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
              d="M22.0003 5.60162C19.6228 4.22985 16.8469 3.71459 14.1356 4.14176C11.4242 4.56893 8.94119 5.91272 7.10067 7.94902C5.26014 9.98533 4.17333 12.5911 4.02148 15.3317C3.86963 18.0723 4.66192 20.7822 6.26622 23.0093C7.87051 25.2365 10.1898 26.8464 12.8374 27.5705C15.485 28.2946 18.3008 28.0891 20.8153 26.9884C23.3298 25.8877 25.3909 23.9582 26.6549 21.5218C27.9189 19.0853 28.3095 16.2892 27.7615 13.5996C27.6145 12.8781 28.0802 12.1739 28.8018 12.0269C29.5233 11.8799 30.2274 12.3456 30.3745 13.0672C31.0443 16.3544 30.5669 19.7719 29.022 22.7498C27.477 25.7277 24.9579 28.0859 21.8847 29.4313C18.8115 30.7766 15.3699 31.0277 12.134 30.1427C8.89802 29.2577 6.06327 27.29 4.10246 24.5679C2.14165 21.8458 1.1733 18.5338 1.3589 15.1842C1.54449 11.8345 2.87281 8.64972 5.12235 6.16091C7.37188 3.67209 10.4066 2.02969 13.7206 1.50759C17.0345 0.985487 20.4272 1.61525 23.333 3.29185C23.9708 3.65987 24.1895 4.47527 23.8215 5.11309C23.4535 5.75091 22.6381 5.96963 22.0003 5.60162ZM30.2761 4.39059C30.7968 4.91129 30.7968 5.75551 30.2761 6.27621L16.9428 19.6095C16.4221 20.1302 15.5779 20.1302 15.0572 19.6095L11.0572 15.6095C10.5365 15.0888 10.5365 14.2446 11.0572 13.7239C11.5779 13.2032 12.4221 13.2032 12.9428 13.7239L16 16.7811L28.3905 4.39059C28.9112 3.86989 29.7554 3.86989 30.2761 4.39059Z"
              fill="currentColor"
            />
          </svg>
        )}

        {status === 'OPEN' && (
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
              d="M16 3.99992C9.37262 3.99992 4.00004 9.3725 4.00004 15.9999C4.00004 22.6273 9.37262 27.9999 16 27.9999C22.6275 27.9999 28 22.6273 28 15.9999C28 9.3725 22.6275 3.99992 16 3.99992ZM1.33337 15.9999C1.33337 7.89974 7.89986 1.33325 16 1.33325C24.1002 1.33325 30.6667 7.89974 30.6667 15.9999C30.6667 24.1001 24.1002 30.6666 16 30.6666C7.89986 30.6666 1.33337 24.1001 1.33337 15.9999ZM16 6.66659C16.7364 6.66659 17.3334 7.26354 17.3334 7.99992V13.8425L20.7371 12.1407C21.3957 11.8114 22.1966 12.0783 22.5259 12.737C22.8553 13.3956 22.5883 14.1965 21.9297 14.5258L16.5963 17.1925C16.183 17.3991 15.6922 17.3771 15.2991 17.1341C14.906 16.8912 14.6667 16.462 14.6667 15.9999V7.99992C14.6667 7.26354 15.2637 6.66659 16 6.66659Z"
              fill="currentColor"
            />
          </svg>
        )}
        {buttonText}
      </button>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmationModal}
        onConfirm={() => handleConfirmModal()}
        message={modalMessage}
      />
    </>
  );
}
