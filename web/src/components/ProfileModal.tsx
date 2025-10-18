import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from './Button';
import { ChangePasswordContent } from './ChangePasswordContent';
import { Input } from './Input';
import { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { api } from '../services/api';

type ProfileModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

type TFile = File | null;

export function ProfileModal({ onClose, isOpen }: ProfileModalProps) {
  const { session, update } = useAuth();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [name, setName] = useState(session?.user.name || '');
  const [email, setEmail] = useState(session?.user.email || '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [technician, setTechnician] = useState<Technician>();
  const [newProfilePhotoFile, setNewProfilePhotoFile] = useState<TFile>(null);
  const [isPhotoRemoved, setIsPhotoRemoved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const UPLOAD_BASE_URL = `${api.defaults.baseURL}/uploads`;

  useEffect(() => {
    if (isOpen && session) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
      setIsPhotoRemoved(false);
      setError('');
      loadTechnician();
    }
  }, [isOpen, session]);

  async function loadTechnician() {
    if (session?.user.role === 'TECHNICIAN') {
      const { data } = await api.get(`/technicians/${session.user.id}`);
      setTechnician(data);
    }
  }

  const handleToggleChangePassword = () => {
    setIsChangePasswordOpen((prev) => !prev);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setNewProfilePhotoFile(event.target.files[0]);
      setIsPhotoRemoved(false);
    } else {
      setNewProfilePhotoFile(null);
    }
  };

  const handleRemovePhoto = () => {
    setNewProfilePhotoFile(null);
    setIsPhotoRemoved(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  async function handleUpdateData(event: FormEvent) {
    event.preventDefault();
    setError('');

    if (!session || isLoading) {
      return;
    }

    setIsLoading(true);
    const id = session.user.id;
    let photoPayload: string | null | undefined = undefined;

    try {
      // Upload PHOTO
      if (newProfilePhotoFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', newProfilePhotoFile);

        const uploadResponse = await api.post('/uploads', uploadFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        photoPayload = uploadResponse.data.filename;
      } else if (isPhotoRemoved) {
        photoPayload = null;
      }

      let photoToUpdateSession: string | null = session?.user.profilePhoto ?? null;

      if (photoPayload !== undefined) {
        photoToUpdateSession = photoPayload;
      }

      // UPDATE PROFILE DATA
      const dataToUpdate = {
        name,
        email,
        profilePhoto: photoPayload,
      };

      let response;
      const endpoint = session.user.role === 'CLIENT' ? `/clients/${id}` : `/technicians/${id}`;

      response = await api.put(endpoint, dataToUpdate);

      update({
        ...session,
        user: {
          ...session.user,
          ...response?.data,
          profilePhoto: photoToUpdateSession,
        },
      });

      onClose();
    } catch (error) {
      if (error instanceof ZodError) {
        setError(error.issues[0].message);
      } else if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  const ProfilePhotoSrc =
    (newProfilePhotoFile && URL.createObjectURL(newProfilePhotoFile)) ||
    (session?.user.profilePhoto && !isPhotoRemoved
      ? `${UPLOAD_BASE_URL}/${session.user.profilePhoto}`
      : undefined);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="w-[440px] bg-white p-6 rounded shadow-lg text-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Conteúdo principal ou Alterar Senha */}
        {!isChangePasswordOpen ? (
          <>
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold font-lato text-base">Perfil</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
                onClick={onClose}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.05715 7.05727C7.57785 6.53657 8.42207 6.53657 8.94277 7.05727L16 14.1145L23.0571 7.05727C23.5778 6.53657 24.4221 6.53657 24.9428 7.05727C25.4635 7.57797 25.4635 8.42219 24.9428 8.94289L17.8856 16.0001L24.9428 23.0573C25.4635 23.578 25.4635 24.4222 24.9428 24.9429C24.4221 25.4636 23.5778 25.4636 23.0571 24.9429L16 17.8857L8.94277 24.9429C8.42207 25.4636 7.57785 25.4636 7.05715 24.9429C6.53645 24.4222 6.53645 23.578 7.05715 23.0573L14.1143 16.0001L7.05715 8.94289C6.53645 8.42219 6.53645 7.57797 7.05715 7.05727Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Borda */}
            <div className="border-b border-gray-500 w-[calc(100%+48px)] -ml-6 mb-5"></div>

            {/* FORMULÁRIO */}
            <form onSubmit={handleUpdateData}>
              <div className="flex items-center mb-5">
                {/* PROFILE PHOTO */}
                {(newProfilePhotoFile && URL.createObjectURL(newProfilePhotoFile)) ||
                (session?.user.profilePhoto && !isPhotoRemoved) ? (
                  <img
                    src={ProfilePhotoSrc}
                    alt="Profile"
                    className="w-[48px] h-[48px] rounded-full object-cover"
                  />
                ) : (
                  <div className="w-[48px] h-[48px] bg-blue-light rounded-full"></div>
                )}
                {/* INPUT PROFILE PHOTO */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <div className="text-gray-200 bg-gray-500 flex items-center p-2 rounded-md gap-2 mx-3">
                  <button
                    type="button"
                    onClick={handleButtonClick}
                    className="font-lato font-bold text-xs cursor-pointer flex items-center gap-2"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.0572 3.05727C15.5779 2.53657 16.4221 2.53657 16.9428 3.05727L23.6095 9.72394C24.1302 10.2446 24.1302 11.0889 23.6095 11.6096C23.0888 12.1303 22.2446 12.1303 21.7239 11.6096L17.3334 7.21903V20.0001C17.3334 20.7365 16.7364 21.3334 16 21.3334C15.2636 21.3334 14.6667 20.7365 14.6667 20.0001V7.21903L10.2762 11.6096C9.75546 12.1303 8.91124 12.1303 8.39054 11.6096C7.86985 11.0889 7.86985 10.2446 8.39054 9.72394L15.0572 3.05727ZM4.00002 18.6667C4.7364 18.6667 5.33335 19.2637 5.33335 20.0001V25.3334C5.33335 25.687 5.47383 26.0262 5.72388 26.2762C5.97393 26.5263 6.31307 26.6667 6.66669 26.6667H25.3334C25.687 26.6667 26.0261 26.5263 26.2762 26.2762C26.5262 26.0262 26.6667 25.687 26.6667 25.3334V20.0001C26.6667 19.2637 27.2636 18.6667 28 18.6667C28.7364 18.6667 29.3334 19.2637 29.3334 20.0001V25.3334C29.3334 26.3943 28.9119 27.4117 28.1618 28.1618C27.4116 28.912 26.3942 29.3334 25.3334 29.3334H6.66669C5.60582 29.3334 4.5884 28.912 3.83826 28.1618C3.08811 27.4117 2.66669 26.3943 2.66669 25.3334V20.0001C2.66669 19.2637 3.26364 18.6667 4.00002 18.6667Z"
                        fill="currentColor"
                      />
                    </svg>
                    Nova Imagem
                  </button>
                </div>

                {/* REMOVE PROFILE PHOTO */}
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="text-feedback-danger p-[9px] rounded-md bg-gray-500 flex items-center cursor-pointer"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.4428 4.44273C12.1299 4.7556 12 5.10023 12 5.33325V6.66659H20V5.33325C20 5.10023 19.87 4.7556 19.5571 4.44273C19.2443 4.12986 18.8996 3.99992 18.6666 3.99992H13.3333C13.1003 3.99992 12.7556 4.12986 12.4428 4.44273ZM22.6666 6.66659V5.33325C22.6666 4.23294 22.1299 3.24424 21.4428 2.55711C20.7556 1.86998 19.7669 1.33325 18.6666 1.33325H13.3333C12.233 1.33325 11.2443 1.86998 10.5571 2.55711C9.87002 3.24424 9.33329 4.23294 9.33329 5.33325V6.66659H3.99996C3.26358 6.66659 2.66663 7.26354 2.66663 7.99992C2.66663 8.7363 3.26358 9.33325 3.99996 9.33325H5.33329V26.6666C5.33329 27.7669 5.87002 28.7556 6.55715 29.4427C7.24428 30.1299 8.23298 30.6666 9.33329 30.6666H22.6666C23.7669 30.6666 24.7556 30.1299 25.4428 29.4427C26.1299 28.7556 26.6666 27.7669 26.6666 26.6666V9.33325H28C28.7363 9.33325 29.3333 8.7363 29.3333 7.99992C29.3333 7.26354 28.7363 6.66659 28 6.66659H22.6666ZM7.99996 9.33325V26.6666C7.99996 26.8996 8.1299 27.2442 8.44277 27.5571C8.75564 27.87 9.10027 27.9999 9.33329 27.9999H22.6666C22.8996 27.9999 23.2443 27.87 23.5571 27.5571C23.87 27.2442 24 26.8996 24 26.6666V9.33325H7.99996Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-8 flex flex-col gap-4">
                <Input
                  required
                  legend="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  required
                  legend="Email"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="relative w-full">
                  <Input legend="Senha" value="********" type="password" disabled />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 font-lato font-bold text-xs text-gray-200 bg-gray-500 rounded-md p-2 cursor-pointer"
                    onClick={() => setIsChangePasswordOpen(true)}
                  >
                    Alterar
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-500 w-[calc(100%+48px)] -ml-6 mb-5"></div>

              {technician && (
                <>
                  <h2 className="text-gray-200 text-sm font-bold font-lato">Disponibilidade</h2>
                  <p className="text-gray-300 text-xs font-lato">Horarios de atendimento</p>

                  <div className="flex flex-wrap gap-x-2 gap-y-2 mt-3 mb-5">
                    {technician.availability.map((iso, index) => (
                      <span
                        key={index}
                        className="text-gray-400 px-2 py-1 rounded-full border-1 border-gray-400 text-xs flex-shrink-0"
                      >
                        {iso.slice(11, 16)}
                      </span>
                    ))}
                  </div>

                  <div className="border-b border-gray-500 w-[calc(100%+48px)] -ml-6 mb-5"></div>
                </>
              )}

              <Button type="submit" className="mx-auto block mt-4">
                {isLoading ? 'Salvando...' : 'Salvar'}
              </Button>
            </form>
            <div className="min-h-[24px] mt-2 text-center">
              {error && (
                <p className="font-lato font-bold text-sm text-feedback-danger shake">{error}</p>
              )}
            </div>
          </>
        ) : (
          <ChangePasswordContent
            onBack={handleToggleChangePassword}
            id={session?.user.id}
            role={session?.user.role}
          />
        )}
      </div>
    </div>,
    document.body,
  );
}
