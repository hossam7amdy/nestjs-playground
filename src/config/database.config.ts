import { registerAs } from '@nestjs/config';
import { z } from 'zod';

export default registerAs('database', () => ({
  host: z.string().default('localhost').parse(process.env.DATABASE_HOST),
  port: z.coerce.number().int().default(5432).parse(process.env.DATABASE_PORT),
  type: z
    .enum(['postgres'])
    .default('postgres')
    .parse(process.env.DATABASE_TYPE),
  username: z.string().default('root').parse(process.env.DATABASE_USERNAME),
  password: z.string().default('root').parse(process.env.DATABASE_PASSWORD),
  database: z.string().default('local').parse(process.env.DATABASE_NAME),
}));
