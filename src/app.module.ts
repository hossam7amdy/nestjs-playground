import { Module } from '@nestjs/common';
import type {
  OnModuleInit,
  OnModuleDestroy,
  OnApplicationShutdown,
  BeforeApplicationShutdown,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule
  implements
    OnModuleInit,
    OnModuleDestroy,
    OnApplicationShutdown,
    BeforeApplicationShutdown
{
  onModuleInit() {
    console.log('onModuleInit');
  }

  onModuleDestroy() {
    console.log('onModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('beforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    console.log('onApplicationShutdown', signal);
  }
}
