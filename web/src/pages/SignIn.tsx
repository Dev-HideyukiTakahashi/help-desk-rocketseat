import { AxiosError } from 'axios';
import { useActionState } from 'react';
import { useNavigate } from 'react-router';
import z, { ZodError } from 'zod';
import circleAlertSvg from '../assets/icons/circle-alert.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';

// SignIn schema
const signInSchema = z.object({
  email: z.email({ message: 'Informe um email válido' }),
  password: z.string().trim().min(6, { message: 'Informe uma senha válida' }),
});

export function SignIn() {
  const [state, formAction, isLoading] = useActionState(signIn, null);
  const auth = useAuth();
  const navigate = useNavigate();

  async function signIn(_: any, formData: FormData) {
    try {
      const data = signInSchema.parse({
        email: formData.get('email'),
        password: formData.get('password'),
      });

      const response = await api.post('/sessions', data);

      auth.save(response.data);
    } catch (error) {
      if (error instanceof ZodError) {
        return { message: error.issues[0].message };
      }

      if (error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }

      return { message: 'Não foi possível entrar!' };
    }
  }

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

        <form action={formAction} className="flex flex-col gap-4">
          <Input
            name="email"
            required
            legend="E-mail"
            type="email"
            placeholder="exemplo@mail.com"
          />
          <Input
            name="password"
            required
            legend="Senha"
            type="password"
            placeholder="Digite sua senha"
          />

          {/* Error message in login  */}
          {state?.message && (
            <div className="flex items-center gap-2">
              <img src={circleAlertSvg} alt="alert-icon" className="w-[1rem] h-[1rem]" />
              <p className="text-sm text-feedback-danger text-center my-4 font-medium">
                {state?.message}
              </p>
            </div>
          )}

          <Button type="submit" isLoading={isLoading}>
            Entrar
          </Button>
        </form>
      </div>

      <div
        className="
          md:w-[400px] p-6 mt-4 md:mt-8
          rounded-lg border border-gray-500
          flex flex-col gap-[24px]
        "
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-xl text-gray-200 font-bold font-lato">Ainda não tem uma conta?</h1>
          <p className="text-sm text-gray-300 font-lato">Cadastre agora mesmo</p>
        </div>
        <Button variantStyle="light" onClick={() => navigate('/signup')}>
          Criar Conta
        </Button>
      </div>
    </>
  );
}
