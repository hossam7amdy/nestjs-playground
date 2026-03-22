import z from 'zod';
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: z.coerce.number().default(3000).parse(process.env.PORT),
}));
