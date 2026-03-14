import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CommonService } from './common.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AppService, CommonService],
})
export class AppModule {}
