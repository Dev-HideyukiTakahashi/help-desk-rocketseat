import navHeaderLogoSvg from '../assets/img/NavHeader.svg';

export function AuthLayout() {
  return (
    <div className="w-screen h-screen bg-[url(./assets/img/Login_Background.png)] bg-cover flex ">
      <div className="flex-grow"></div>
      <main className="bg-gray-600 w-1/2 mt-12 rounded-tl-lg flex justify-center ">
        <img
          src={navHeaderLogoSvg}
          alt="nav-header-logo"
          className="w-[157px] h-[40px] mt-[3rem]"
        />
      </main>
    </div>
  );
}
