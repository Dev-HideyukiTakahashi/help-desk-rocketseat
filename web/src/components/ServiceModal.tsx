import { useState, type FormEvent } from 'react';
import { api } from '../services/api';
import { Button } from './Button';
import { Input } from './Input';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function ServiceModal({ isOpen, onClose }: Props) {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');

  if (!isOpen) {
    return null;
  }

  function handleSaveService(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      title,
      value,
    };

    api.post('/services', data);

    console.log(title);
    console.log(value);
    setTitle('');
    setValue('');
    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-600 w-[440px] h-[390px] rounded-lg shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-7 border-b border-gray-500 flex justify-between">
          <h2 className="text-gray-200 font-lato font-bold text-base">Cadastro de Serviço</h2>
          <svg
            width="18"
            height="18"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer text-gray-300"
            onClick={onClose}
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
            <Input
              legend="título"
              placeholder="Nome do serviço"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              legend="valor"
              placeholder="R$ 0,00"
              type="number"
              value={value}
              required
              onChange={(e) => setValue(e.target.value)}
            />
          </main>

          <footer className="flex flex-col items-center p-7 border-t border-gray-500">
            <Button type="submit">Salvar</Button>
          </footer>
        </form>
      </div>
    </div>
  );
}
