import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  mongo: {
    uri: process.env.MONGODB_URI,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
}));
