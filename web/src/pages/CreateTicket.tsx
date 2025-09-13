import { AxiosError } from 'axios';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import z, { ZodError } from 'zod';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { api } from '../services/api';

export const createTicketSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  description: z.string().min(5, 'Descrição deve ter pelo menos 5 caracteres'),
  services: z
    .array(z.uuid('Id do serviço inválido'))
    .min(1, 'É necessário selecionar ao menos um serviço')
    .max(1, 'Somente um serviço pode ser selecionado no momento'),
});

export function CreateTicket() {
  const [focusDesc, setFocusDesc] = useState(false);
  const [focusService, setFocusService] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data } = await api.get('/services');

        setServices(data.services as Service[]);
        setIsLoading(false);
        setError('');
      } catch (error) {
        setError('Não foi possível carregar os serviços');
      }
    }

    fetchServices();
  }, []);

  const selectedService = services.find((s) => s.id === selectedServiceId);

  function handleServiceChange(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedServiceId(e.target.value);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const data = {
      title,
      description,
      services: [selectedService?.id],
    };

    try {
      const payload = createTicketSchema.parse(data);

      await api.post('/tickets', payload);

      navigate('/');
      setTitle('');
      setDescription('');
      setSelectedServiceId('');
    } catch (error) {
      if (error instanceof ZodError) {
        setError(error.issues[0].message);
      } else if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      } else {
        setError('Erro ao criar o chamado. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-end place-content-between md:mb-7">
        <h1 className="text-blue-dark font-lato font-bold text-2xl">Novo chamado</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-8"
        id="technician-form"
      >
        <div className="w-full md:w-2/3 border border-gray-500 p-6 rounded-lg flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-gray-200 text-base font-lato font-bold">Informações</h1>
            <span className="text-gray-400 font-lato font-bold text-xs">
              Configure os dias e horários em que você está disponível para atender <br /> chamados
            </span>
          </div>

          <Input
            required
            legend="titulo"
            placeholder="Digite um título para o chamado"
            onChange={(e) => setTitle(e.target.value)}
          />

          <label
            htmlFor="story"
            className={`uppercase font-bold font-lato text-xs transition-colors duration-200
              ${focusDesc ? 'text-blue-base' : 'text-gray-300'}`}
          >
            descrição
          </label>
          <textarea
            required
            id="story"
            name="story"
            rows={3}
            onFocus={() => setFocusDesc(true)}
            onBlur={() => setFocusDesc(false)}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva o que está acontecendo"
            className="border-b border-gray-400
              focus:border-blue-base outline-none
              transition-colors duration-200 resize-none
              placeholder:text-sm placeholder:font-lato placeholder:text-gray-400"
          ></textarea>

          <label
            htmlFor="service-select"
            className={`uppercase font-bold font-lato text-xs transition-colors duration-200
              ${focusService ? 'text-blue-base' : 'text-gray-300'}`}
          >
            categoria de serviço
          </label>
          <select
            required
            id="service-select"
            name="service-select"
            className={`border-b border-gray-500 pb-4 font-lato text-base focus:outline-none ${
              selectedServiceId === '' ? 'text-gray-400' : 'text-gray-200'
            }`}
            value={selectedServiceId}
            onChange={handleServiceChange}
            onFocus={() => setFocusService(true)}
            onBlur={() => setFocusService(false)}
          >
            <option value="" className="text-gray-400">
              Selecione a categoria de atendimento
            </option>

            {services
              .filter((service) => service.status !== 'INACTIVE')
              .map((service) => (
                <option key={service.id} value={service.id} className="text-gray-200">
                  {service.title}
                </option>
              ))}
          </select>
        </div>

        {/* RESUMO */}
        <div className="w-full md:w-1/3 border h-fit border-gray-500 p-6 rounded-lg flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-gray-200 text-base font-lato font-bold">Resumo</h1>
            <span className="text-gray-400 font-lato font-bold text-xs">Valores e detalhes</span>
          </div>

          <div>
            <span className="text-xs font-lato font-bold text-gray-400">Categoria de serviço</span>
            <p className="text-sm font-lato text-gray-200">
              {selectedService?.title ?? 'Nenhum selecionado'}
            </p>
          </div>

          <div>
            <span className="text-xs font-lato font-bold text-gray-400">Custo inicial</span>
            <p className="text-xl font-lato font-bold text-gray-200">
              <small className="text-xs font-lato font-bold text-gray-200">R$ </small>
              200,00
            </p>
          </div>

          <p className="text-xs font-lato font-bold text-gray-400">
            O chamado será automaticamente atribuído a <br /> um técnico disponível
          </p>

          <div className="flex justify-center">
            <Button type="submit" isLoading={isLoading} variantSize="confirmWindow">
              Criar chamado
            </Button>
          </div>
        </div>
      </form>
      {error && <p className="text-feedback-danger mt-4 font-lato text-sm">{error}</p>}
    </div>
  );
}
