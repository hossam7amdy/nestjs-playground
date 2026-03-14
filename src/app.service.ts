import { Injectable, OnModuleInit } from '@nestjs/common';
import { CommonService } from './common/common.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class AppService implements OnModuleInit {
  private commonService: CommonService;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.commonService = this.moduleRef.get(CommonService);
  }
}
