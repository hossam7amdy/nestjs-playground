import { registerAs } from '@nestjs/config';
import { z } from 'zod';

export default registerAs('cache', () => ({
  redisUrl: z.string().default('localhost').parse(process.env.REDIS_URL),
}));
