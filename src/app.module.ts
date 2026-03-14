import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { CommonService } from './common/common.service';
import { TransientService } from './transient.service';

@Module({
  imports: [CommonModule],
  controllers: [],
  providers: [AppService, CommonService, TransientService],
})
export class AppModule {}
