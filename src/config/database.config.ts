import { registerAs } from '@nestjs/config';
import z from 'zod';

export default registerAs('database', () => ({
  mongo: {
    uri: z
      .url()
      .default('mongodb://localhost:27017/nestjs-playground')
      .parse(process.env.MONGODB_URI),
  },
}));
