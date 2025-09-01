import z from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.url({ message: 'URL do banco de dados inválida' }),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET deve ser fornecido'),
  JWT_EXPIRES_IN: z.coerce.number().optional().default(86400),
  PORT: z.coerce.number().optional().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Variáveis de ambiente inválidas:', _env.error.format());
  throw new Error('Variáveis de ambiente inválidas.');
}

export const env = _env.data;
