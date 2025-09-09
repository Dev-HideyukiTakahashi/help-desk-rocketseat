import { useEffect, type ReactNode } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string | ReactNode;
}

export function ConfirmationModal({ isOpen, onClose, onConfirm, message }: Props) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-600 w-[440px] rounded-lg shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-7 border-b border-gray-500 flex justify-between">
          <h2 className="text-gray-200 font-lato font-bold text-base">Confirmação</h2>
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

        <main className="p-7 flex flex-col gap-4 flex-grow">
          <p className="text-gray-200 font-lato text-sm">{message}</p>
        </main>

        <footer className="flex justify-end gap-3 p-4 border-t border-gray-500">
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer  rounded-md bg-gray-500 text-gray-200 hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 cursor-pointer rounded-md bg-red-600 text-white hover:bg-red-500 transition-colors"
          >
            Confirmar
          </button>
        </footer>
      </div>
    </div>
  );
}
