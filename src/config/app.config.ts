import { registerAs } from '@nestjs/config';
import { z } from 'zod';

export default registerAs('app', () => ({
  port: z.coerce.number().int().default(3000).parse(process.env.PORT),
  useCache: z.coerce.boolean().default(false).parse(process.env.USE_CACHE),
}));
