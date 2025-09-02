import { Outlet } from 'react-router';
import navHeaderLogoSvg from '../assets/img/NavHeader.svg';

export function AuthLayout() {
  return (
    <div className="w-full h-screen bg-[url(./assets/img/Login_Background.png)] bg-cover flex flex-col md:flex-row ">
      <div className="md:flex-grow"></div>
      <main
        className="bg-gray-600 flex flex-col items-center
      rounded-t-lg min-h-[824px] mt-[32px]
      md:rounded-tl-lg md:rounded-tr-none md:w-1/2 md:mt-[12px] md:h-auto"
      >
        <img
          src={navHeaderLogoSvg}
          alt="nav-header-logo"
          className="w-[157px] h-[40px] mt-[3rem]"
        />
        <Outlet />
      </main>
    </div>
  );
}
