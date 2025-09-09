import { AxiosError } from 'axios';
import { useActionState, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import z, { ZodError } from 'zod';
import { api } from '../services/api';
import { defaultAvailability, generateTimes } from '../utils/generate-time';
import { getInitials } from '../utils/get-name-initials';
import { Button } from './Button';
import { Input } from './Input';
import { TimeButton } from './TimeButton';

const morning = generateTimes(7, 12);
const afternoon = generateTimes(13, 18);
const evening = generateTimes(19, 23);

const technicianSchema = z.object({
  name: z.string().trim().min(2, { message: 'Informe um nome válido, mínimo de 2 caracteres' }),
  email: z.email({ message: 'Informe um e-mail válido' }),
  password: z.string().min(6, { message: 'Senha mínimo 6 caracteres' }).optional(),
  availability: z
    .array(z.string())
    .nonempty({ message: 'Informe pelo menos um horário de atendimento' }),
});

export function TechnicianForm() {
  const { mode } = useParams<{ mode: string }>();
  const isEdit = mode === 'edit';
  const location = useLocation();
  const navigate = useNavigate();
  const [state, formAction, isLoading] = useActionState(handleSubmit, null);

  const technician = location.state as Technician;

  const [name, setName] = useState(technician?.name ?? '');
  const [email, setEmail] = useState(technician?.email ?? '');
  const [password, setPassword] = useState('');
  const [availability, setAvailability] = useState<string[]>(
    technician
      ? technician.availability.map((iso) => iso.slice(11, 16)) // modo edit
      : defaultAvailability, // novo técnico
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(_: any, formData: FormData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    const data = {
      name,
      email,
      ...(password ? { password } : {}),
      availability: availability.map((hour) => `2025-09-07T${hour}:00.000Z`),
    };

    try {
      technicianSchema.parse(data);

      if (technician) {
        await api.put(`/technicians/${technician.id}`, data);
      } else {
        await api.post('/technicians', data);
      }

      setError(null);
      navigate(-1);
    } catch (error) {
      if (error instanceof ZodError) {
        setError(error.issues[0].message);
      } else if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    }
  }

  const handleToggleTime = (time: string) => {
    setAvailability(
      (prev) =>
        prev.includes(time)
          ? prev.filter((t) => t !== time) // desmarca
          : [...prev, time], // marca
    );
  };

  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-end place-content-between md:mb-7">
        <div>
          <div className="font-lato text-gray-300 mb-1">
            <button
              className="flex items-center gap-2 pl-1 cursor-pointer hover:text-gray-100"
              onClick={() => navigate(-1)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.9428 5.72378C17.4635 6.24448 17.4635 7.0887 16.9428 7.60939L9.8856 14.6666H25.3333C26.0697 14.6666 26.6666 15.2635 26.6666 15.9999C26.6666 16.7363 26.0697 17.3333 25.3333 17.3333H9.8856L16.9428 24.3904C17.4635 24.9111 17.4635 25.7554 16.9428 26.2761C16.4221 26.7968 15.5779 26.7968 15.0572 26.2761L5.72384 16.9427C5.20314 16.422 5.20314 15.5778 5.72384 15.0571L15.0572 5.72378C15.5779 5.20308 16.4221 5.20308 16.9428 5.72378Z"
                  fill="currentColor"
                />
              </svg>{' '}
              Voltar
            </button>
          </div>
          <h1 className="text-blue-dark font-lato font-bold text-2xl">Perfil de técnico</h1>
        </div>
        <div className="flex gap-2">
          <Button variantStyle="light" variantSize="confirmWindow" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <Button
            variantSize="confirmWindow"
            type="submit"
            isLoading={isLoading}
            form="technician-form"
          >
            Salvar
          </Button>
        </div>
      </div>

      <form action={formAction} className="flex flex-col md:flex-row gap-8" id="technician-form">
        <div className="w-full md:w-1/2 border border-gray-500 p-6 rounded-lg flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-gray-200 text-base font-lato font-bold">Dados pessoais</h1>
            <span className="text-gray-300 text-xs font-lato">
              Defina as informações do perfil de técnico
            </span>
          </div>
          <div className="flex flex-col gap-4 flex-grow">
            {isEdit && (
              <span
                className="bg-blue-dark p-1 w-[48px] h-[48px]
                  font-lato text-xl text-gray-600
                  rounded-full flex justify-center items-center"
              >
                {getInitials(technician?.name ?? '')}
              </span>
            )}
            <Input
              name="name"
              legend="Nome"
              placeholder="Nome completo"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name="email"
              legend="E-mail"
              placeholder="exemplo@mail.com"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isEdit && (
              <>
                <Input
                  name="password"
                  legend="Senha"
                  placeholder="Defina a senha de acesso"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="text-gray-400 font-lato text-xs italic -mt-3">
                  Mínimo de 6 dígitos
                </label>
              </>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2 border border-gray-500 p-6 rounded-lg flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-gray-200 text-base font-lato font-bold">Horários de atendimento</h1>
            <span className="text-gray-300 text-xs font-lato">
              Selecione os horários de disponibilidade do técnico para atendimento
            </span>
          </div>

          <div className="flex-grow flex flex-col gap-4">
            {/* Manhã */}
            <div>
              <h2 className="text-gray-300 text-xs font-bold font-lato mb-2 uppercase">Manhã</h2>
              <div className="flex flex-wrap gap-2">
                {morning.map((time) => (
                  <TimeButton
                    key={time}
                    time={time}
                    isSelected={availability.includes(time)}
                    onClick={() => handleToggleTime(time)}
                  />
                ))}
              </div>
            </div>

            {/* Tarde */}
            <div>
              <h2 className="text-gray-300 text-xs font-bold font-lato mb-2 uppercase">Tarde</h2>
              <div className="flex flex-wrap gap-2">
                {afternoon.map((time) => (
                  <TimeButton
                    key={time}
                    time={time}
                    isSelected={availability.includes(time)}
                    onClick={() => handleToggleTime(time)}
                  />
                ))}
              </div>
            </div>

            {/* Noite */}
            <div>
              <h2 className="text-gray-300 text-xs font-bold font-lato mb-2 uppercase">Noite</h2>
              <div className="flex flex-wrap gap-2">
                {evening.map((time) => (
                  <TimeButton
                    key={time}
                    time={time}
                    isSelected={availability.includes(time)}
                    onClick={() => handleToggleTime(time)}
                  />
                ))}
              </div>
            </div>
          </div>
          {error && <p className="text-feedback-danger mt-4 font-lato text-sm">{error}</p>}
        </div>
      </form>
    </div>
  );
}
