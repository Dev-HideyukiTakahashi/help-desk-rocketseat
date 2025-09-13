import { useEffect, useRef, useState } from 'react';
import MenuSvg from '../assets/icons/menu.svg';
import CloseSvg from '../assets/icons/x.svg';
import LogoIconSvg from '../assets/img/Logo_IconLight.svg';
import { useAuth } from '../hooks/useAuth';
import { getInitials } from '../utils/get-name-initials';
import { translateRole } from '../utils/translate-role';
import { MainLayout } from './MainLayout';
import { ProfileMenu } from './ProfileMenu';
import { SidebarLayout } from './SidebarLayout';
import { SidebarMobileLayout } from './SidebarMobileLayout';

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { session } = useAuth();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef, buttonRef, profileMenuRef, profileButtonRef]);

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-100 overflow-x-hidden">
      {/* Sidebar para telas grandes (desktop) */}+{' '}
      <div className="hidden md:block fixed h-screen w-[200px]">
        <SidebarLayout />
      </div>
      {/* Cabeçalho e botão do menu hambúrguer para mobile */}
      <header className="flex items-center p-4 md:hidden">
        <button
          ref={buttonRef}
          onClick={toggleSidebar}
          className="p-3 text-white focus:outline-none bg-gray-200 rounded-md mr-4"
        >
          {isSidebarOpen ? (
            <img src={CloseSvg} alt="close menu" className="w-[20px] h-[20px]" />
          ) : (
            <img src={MenuSvg} alt="menu" className="w-[20px] h-[20px]" />
          )}
        </button>
        <div className="flex-grow flex items-center gap-3">
          <img src={LogoIconSvg} alt="logo" className="w-[32px] h-[32px]" />
          <div>
            <h1 className="text-white font-lato text-base font-bold">HelpDesk</h1>
            <p className="text-blue-light font-lato uppercase font-bold text-xs">
              {translateRole(session?.user.role)}
            </p>
          </div>
        </div>
        <div className="relative">
          <div
            ref={profileButtonRef}
            onClick={toggleProfileMenu}
            className="bg-blue-dark w-[32px] h-[32px] text-gray-600 rounded-2xl flex items-center justify-center cursor-pointer"
          >
            {getInitials(session?.user.name)}
          </div>
          {isProfileMenuOpen && (
            <div ref={profileMenuRef}>
              <ProfileMenu isOpen={isProfileMenuOpen} onClose={toggleProfileMenu} />
            </div>
          )}
        </div>
      </header>
      {/* Sidebar do mobile (oculto por padrão) */}
      <div
        ref={sidebarRef}
        className={`fixed left-0 w-[220px] h-[280px] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ top: '6rem' }}
      >
        <SidebarMobileLayout onClose={() => setIsSidebarOpen(false)} />
      </div>
      <div className="md:ml-[200px] flex-grow">
        <MainLayout />
      </div>
    </div>
  );
}
