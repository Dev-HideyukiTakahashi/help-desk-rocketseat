import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { ClientModal } from '../../components/ClientModal';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { Pagination } from '../../components/Pagination';
import { api } from '../../services/api';
import { getInitials } from '../../utils/get-name-initials';

const PER_PAGE = 8;

export function Client() {
  const [page, setPage] = useState(1);
  const [totalOfPage, setTotalOfPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [editClient, setEditClient] = useState<Client | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  function handleEditClientModal(client: Client) {
    setEditClient(client);
    setIsModalOpen(true);
  }

  function handleCloseServiceModal() {
    setIsModalOpen(false);
    fetchClients();
  }

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

  async function fetchClients() {
    try {
      const { data } = await api.get<ClientAPIResponse>('/clients', {
        params: {
          page,
          perPage: PER_PAGE,
        },
      });
      setTotalOfPage(data.pagination.totalPages);
      setClients(data.clients);
      setError(null);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message || 'Erro ao carregar clientes.');
      }
    }
  }

  function handleOpenConfirmationModal(client: Client) {
    setClientToDelete(client);
    setIsConfirmationModalOpen(true);
  }

  function handleCloseConfirmationModal() {
    setClientToDelete(null);
    setIsConfirmationModalOpen(false);
  }

  async function handleDeleteClient(id: string) {
    try {
      await api.delete(`/clients/${id}`);
      fetchClients();
      handleCloseConfirmationModal();
    } catch (error) {
      setError('Erro ao deletar cliente');
    }
  }

  useEffect(() => {
    fetchClients();
  }, [page]);

  return (
    <>
      <div className="mb-9">
        <h1 className="text-blue-dark font-lato font-bold text-2xl ">Clientes</h1>
      </div>
      {error && <p className="text-feedback-danger mb-3 font-lato text-sm">{error}</p>}
      <div className="rounded-lg overflow-hidden">
        <table className="w-full table-fixed">
          <thead
            className="text-gray-400 font-lato font-bold text-base
                border border-gray-500 text-left"
          >
            <tr>
              <th className="p-2 sm:p-4 text-sm">Nome</th>
              <th className="p-2 sm:p-4 text-sm text-center">E-mail</th>
              <th></th>
              <th className="w-[30px] md:w-[80px]"></th>
            </tr>
          </thead>
          <tbody className="font-lato text-gray-200">
            {clients.map((client) => (
              <tr key={client.id} className="border border-gray-500 ">
                <td className="p-2 sm:p-4 font-lato md:table-cell">
                  <div className="flex items-center gap-2 ">
                    <span
                      className="bg-blue-dark p-1 
                        font-lato text-xs text-gray-600
                        rounded-full flex justify-center items-center w-[28px] h-[28px]"
                    >
                      {getInitials(client.name)}
                    </span>
                    <p className="text-sm font-bold">{client.name}</p>
                  </div>
                </td>
                <td className="p-2 sm:p-4 text-sm text-center truncate">{client.email}</td>
                <td className="p-2 sm:p-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleOpenConfirmationModal(client)}
                      className="bg-gray-500 p-2 sm:p-3 rounded-md cursor-pointer hover:text-gray-600 hover:bg-red-200"
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
                          d="M12.4428 4.44273C12.1299 4.7556 12 5.10023 12 5.33325V6.66659H20V5.33325C20 5.10023 19.87 4.7556 19.5571 4.44273C19.2443 4.12986 18.8996 3.99992 18.6666 3.99992H13.3333C13.1003 3.99992 12.7556 4.12986 12.4428 4.44273ZM22.6666 6.66659V5.33325C22.6666 4.23294 22.1299 3.24424 21.4428 2.55711C20.7556 1.86998 19.7669 1.33325 18.6666 1.33325H13.3333C12.233 1.33325 11.2443 1.86998 10.5571 2.55711C9.87002 3.24424 9.33329 4.23294 9.33329 5.33325V6.66659H3.99996C3.26358 6.66659 2.66663 7.26354 2.66663 7.99992C2.66663 8.7363 3.26358 9.33325 3.99996 9.33325H5.33329V26.6666C5.33329 27.7669 5.87002 28.7556 6.55715 29.4427C7.24428 30.1299 8.23298 30.6666 9.33329 30.6666H22.6666C23.7669 30.6666 24.7556 30.1299 25.4428 29.4427C26.1299 28.7556 26.6666 27.7669 26.6666 26.6666V9.33325H28C28.7363 9.33325 29.3333 8.7363 29.3333 7.99992C29.3333 7.26354 28.7363 6.66659 28 6.66659H22.6666ZM7.99996 9.33325V26.6666C7.99996 26.8996 8.1299 27.2442 8.44277 27.5571C8.75564 27.87 9.10027 27.9999 9.33329 27.9999H22.6666C22.8996 27.9999 23.2443 27.87 23.5571 27.5571C23.87 27.2442 24 26.8996 24 26.6666V9.33325H7.99996Z"
                          fill="#D03E3E"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleEditClientModal(client)}
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
                  </div>
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
      <ClientModal isOpen={isModalOpen} onClose={handleCloseServiceModal} client={editClient} />

      {clientToDelete && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={handleCloseConfirmationModal}
          onConfirm={() => handleDeleteClient(clientToDelete.id)}
          message={
            <>
              <p>
                Tem certeza que deseja excluir o cliente: <b>{clientToDelete?.name}</b>?
              </p>
              <p>Esta ação não pode ser desfeita.</p>
            </>
          }
        />
      )}
    </>
  );
}
