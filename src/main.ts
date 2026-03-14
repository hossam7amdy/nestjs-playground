import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT ?? 3000;
  const loggerMessage = `Application is running on: http://localhost:${port}`;

  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // consumes memory by starting listeners.
  app.enableShutdownHooks();

  await app.listen(port);
  logger.log(loggerMessage);

  let counter = 0;
  setInterval(() => {
    // still runs even when the app stops
    console.log('counter:', counter++);
  }, 1000);

  await app.close();
}
void bootstrap();
