// O componente NotFound aprimorado com design mais robusto
export function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-900 text-gray-100 font-sans">
      <div className="flex flex-col items-center text-center p-10 bg-gray-800 rounded-lg shadow-2xl">
        <h1 className="font-extrabold text-7xl md:text-9xl mb-4 text-green-500 animate-pulse">
          404
        </h1>
        <h2 className="font-bold text-xl md:text-2xl mb-4">Página não encontrada</h2>
        <p className="text-gray-400 text-sm md:text-base mb-8 max-w-md">
          A página que você está procurando pode ter sido removida, ter seu nome alterado ou está
          temporariamente indisponível.
        </p>
        <a
          href="/"
          className="py-3 px-6 bg-green-500 rounded-full font-semibold text-white hover:bg-green-600 transition-colors duration-300 transform hover:scale-105"
        >
          Voltar para o início
        </a>
      </div>
    </div>
  );
}
