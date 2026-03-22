import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        const logger = new Logger('MongooseConnection');
        return {
          uri: 'mongodb://localhost:27017/nestjs-playground',
          onConnectionCreate(connection) {
            connection.on('connected', () =>
              logger.log(`Mongoose connected to ${connection.name}`),
            );
            connection.on('open', () =>
              logger.log(`Mongoose connection opened to ${connection.name}`),
            );
            connection.on('disconnected', () =>
              logger.log(`Mongoose disconnected from ${connection.name}`),
            );
            connection.on('reconnected', () =>
              logger.log(`Mongoose reconnected to ${connection.name}`),
            );
            connection.on('disconnecting', () =>
              logger.log(`Mongoose disconnecting from ${connection.name}`),
            );
            return connection;
          },
        };
      },
    }),
    CatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
