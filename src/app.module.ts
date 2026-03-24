import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { ScheduleModule } from '@nestjs/schedule';
import validateEnv from './config/env.validator';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      load: [appConfig, databaseConfig],
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: ({ mongo }: ConfigType<typeof databaseConfig>) => {
        const logger = new Logger('MongooseConnection');
        return {
          uri: mongo.uri,
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
      inject: [databaseConfig.KEY],
    }),
    BullModule.forRootAsync({
      useFactory: ({ redis }: ConfigType<typeof databaseConfig>) => {
        return {
          connection: redis,
        };
      },
      inject: [databaseConfig.KEY],
    }),
    CatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
