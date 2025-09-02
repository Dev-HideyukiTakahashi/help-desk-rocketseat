import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function SignIn() {
  return (
    <>
      <div
        className="
          md:w-[400px] p-6 mt-8 md:mt-12
          rounded-lg border border-gray-500
          flex flex-col gap-8
        "
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-xl text-gray-200 font-bold font-lato ">Acesse o portal</h1>
          <p className="text-xs text-gray-300 font-lato">
            Entre usando seu e-mail e senha cadastrados
          </p>
        </div>

        <div className="flex flex-col gap-[1rem]">
          <Input legend="E-mail" type="email" placeholder="exemplo@mail.com" />
          <Input legend="Senha" type="password" placeholder="Digite sua senha" />
        </div>

        <Button>Entrar</Button>
      </div>

      <div
        className="
          w-full max-w-md md:w-[400px] p-6 mt-4 md:mt-8
          rounded-lg border border-gray-500
          flex flex-col gap-[24px]
        "
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-xl text-gray-200 font-bold font-lato">Ainda não tem uma conta?</h1>
          <p className="text-sm text-gray-300 font-lato">Cadastre agora mesmo</p>
        </div>
        <Button variantStyle="light">Criar Conta</Button>
      </div>
    </>
  );
}
