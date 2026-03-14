import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from './example/example.module';
import { CustomService } from './custom/custom.service';

@Module({
  imports: [ExampleModule],
  controllers: [AppController],
  providers: [AppService, CustomService],
})
export class AppModule {}
