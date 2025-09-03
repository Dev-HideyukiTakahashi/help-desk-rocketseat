import { AxiosError } from 'axios';
import { useActionState } from 'react';
import { useNavigate } from 'react-router';
import z, { ZodError } from 'zod';
import circleAlertSvg from '../assets/icons/circle-alert.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { api } from '../services/api';

// SignUp schema
const signUpSchema = z.object({
  name: z.string().trim().min(2, { message: 'Informe um nome válido' }),
  email: z.email({ message: 'Informe um email válido' }),
  password: z.string().trim().min(6, { message: 'Informe uma senha válida' }),
});

export function SignUp() {
  const [state, formAction, isLoading] = useActionState(signUp, null);
  const navigate = useNavigate();

  async function signUp(_: any, formData: FormData) {
    try {
      const data = signUpSchema.parse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
      });

      await api.post('/clients', data);

      if (confirm('Cadastro realizado com sucesso. Ir para tela de entrar?')) {
        navigate('/');
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return { message: error.issues[0].message };
      }

      if (error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }

      return { message: 'Não foi possível cadastrar!' };
    }
  }

  return (
    <>
      <div
        className="md:w-[400px] p-6 mt-8 md:mt-12
        rounded-lg border border-gray-500
        flex flex-col gap-8"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-200 font-lato font-bold text-xl">Crie sua conta</h1>
          <p className="text-gray-300 font-regular text-xs">Informe seu nome, e-mail e senha</p>
        </div>
        <form action={formAction} className="flex flex-col gap-4">
          <Input name="name" required legend="Nome" placeholder="Digite o nome completo" />
          <Input
            name="email"
            required
            type="email"
            legend="E-mail"
            placeholder="exemplo@mail.com"
          />
          <Input
            name="password"
            required
            type="password"
            legend="Senha"
            placeholder="Digite sua senha"
          />
          <label className="text-gray-400 font-lato text-xs italic -mt-3">
            Mínimo de 6 dígitos
          </label>

          {state?.message && (
            <div className="flex items-center gap-2">
              <img src={circleAlertSvg} alt="alert-icon" className="w-[1rem] h-[1rem]" />
              <p className="text-sm text-feedback-danger text-center my-4 font-medium">
                {state.message}
              </p>
            </div>
          )}
          <Button type="submit" isLoading={isLoading}>
            Cadastrar
          </Button>
        </form>
      </div>

      <div
        className="md:w-[400px] p-6 mt-4 md:mt-8
        rounded-lg border border-gray-500
        flex flex-col gap-8"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-200 font-lato font-bold text-xl">Já uma conta?</h1>
          <p className="text-gray-300 font-lato text-sm">Entre agora mesmo</p>
        </div>
        <Button variantStyle="light" onClick={() => navigate('/')}>
          Acessar conta
        </Button>
      </div>
    </>
  );
}
