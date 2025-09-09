import { Link } from 'react-router';
import CircleUserSVG from '../assets/icons/circle-user.svg';
import LogoutSVG from '../assets/icons/log-out.svg';
import { useAuth } from '../hooks/useAuth';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function ProfileMenu({ isOpen, onClose }: Props) {
  const { remove, session } = useAuth();

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
    absolute right-0 top-full mt-2 w-40 bg-gray-100 rounded-md shadow-lg z-50 py-5
    md:top-auto md:bottom-full md:left-full md:ml-11 md:mt-0 md:mb-2"
    >
      <div className="text-gray-400 font-bold text-xs font-lato p-4 border-b border-gray-300">
        Opções
      </div>
      {session?.user.role !== 'ADMIN' && (
        <Link
          to={'/'}
          className="text-gray-600 text-xs font-lato flex items-center gap-2 mt-4 p-3 
        hover:bg-blue-dark hover:rounded-sm"
        >
          <img src={CircleUserSVG} alt="profile-icon" className="w-[20px] h-[20px]" />
          <span className="text-sm font-lato">Perfil</span>
        </Link>
      )}

      <button
        onClick={() => {
          remove();
          onClose();
        }}
        className="mt-2 ml-[2px] md:ml-0  text-feedback-danger text-sm font-lato flex items-center gap-2 
        hover:bg-blue-dark hover:rounded-sm p-3 w-full box-border"
      >
        <img src={LogoutSVG} alt="logout-icon" className="w-[20px] h-[20px]" />
        <p>Sair</p>
      </button>
    </div>
  );
}
