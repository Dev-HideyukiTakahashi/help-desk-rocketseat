import { AxiosError } from 'axios';
import { useEffect, useState, type FormEvent } from 'react';
import z, { ZodError } from 'zod';
import { api } from '../services/api';
import { Button } from './Button';
import { Input } from './Input';

type Props = {
  client?: Client;
  isOpen: boolean;
  onClose: () => void;
};

const clientSchema = z.object({
  name: z.string().min(2, { message: 'Informe um nome válido.' }),
  email: z.email({ message: 'Informe um email válido' }),
});

export function ClientModal({ client, isOpen, onClose }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (client) {
      setName(client.name);
      setEmail(String(client.email));
    }
  }, [client]);

  if (!isOpen) {
    return null;
  }

  async function handleSaveService(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name || !email) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const data = {
        name,
        email,
      };

      if (client) {
        clientSchema.parse(data);

        await api.put(`/clients/${client.id}`, data);
      }

      setError('');
      handleClose();
    } catch (error) {
      if (error instanceof ZodError) {
        setError(error.issues[0].message);
      } else if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    }
  }
  function handleClose() {
    setError('');
    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50"
      onClick={handleClose}
    >
      <div
        className="bg-gray-600 w-[440px] h-[390px] rounded-lg shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-7 border-b border-gray-500 flex justify-between">
          <h2 className="text-gray-200 font-lato font-bold text-base">Cliente</h2>
          <svg
            width="18"
            height="18"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer text-gray-300"
            onClick={handleClose}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.05715 7.05727C7.57785 6.53657 8.42207 6.53657 8.94277 7.05727L16 14.1145L23.0571 7.05727C23.5778 6.53657 24.4221 6.53657 24.9428 7.05727C25.4635 7.57797 25.4635 8.42219 24.9428 8.94289L17.8856 16.0001L24.9428 23.0573C25.4635 23.578 25.4635 24.4222 24.9428 24.9429C24.4221 25.4636 23.5778 25.4636 23.0571 24.9429L16 17.8857L8.94277 24.9429C8.42207 25.4636 7.57785 25.4636 7.05715 24.9429C6.53645 24.4222 6.53645 23.578 7.05715 23.0573L14.1143 16.0001L7.05715 8.94289C6.53645 8.42219 6.53645 7.57797 7.05715 7.05727Z"
              fill="currentColor"
            />
          </svg>
        </header>

        <form onSubmit={handleSaveService} className="flex flex-col flex-grow">
          <main className="p-7 flex gap-4 flex-col flex-grow">
            <Input legend="nome" value={name} required onChange={(e) => setName(e.target.value)} />
            <Input
              legend="e-mail"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </main>
          <footer className="flex flex-col items-center p-3 border-t border-gray-500">
            <Button type="submit">Salvar</Button>
            <div className="min-h-[24px] mt-2">
              {error && (
                <p className="font-lato font-bold text-sm text-feedback-danger shake">{error}</p>
              )}
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
}
