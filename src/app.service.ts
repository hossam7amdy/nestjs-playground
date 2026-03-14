import { Injectable, OnModuleInit } from '@nestjs/common';
import { CommonService } from './common/common.service';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { TransientService } from './transient.service';
import assert from 'node:assert';

@Injectable()
export class AppService implements OnModuleInit {
  private commonService: CommonService;

  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    this.commonService = this.moduleRef.get(CommonService);

    await this.resolveTransientScopedProviders();
    await this.resolveSharedTransientScopedProviders();
  }

  async resolveTransientScopedProviders() {
    const transientServices = await Promise.all([
      this.moduleRef.resolve(TransientService),
      this.moduleRef.resolve(TransientService),
    ]);

    assert(transientServices[0] !== transientServices[1]);
  }

  async resolveSharedTransientScopedProviders() {
    const contextId = ContextIdFactory.create();

    const transientServices = await Promise.all([
      this.moduleRef.resolve(TransientService, contextId),
      this.moduleRef.resolve(TransientService, contextId),
    ]);

    assert(transientServices[0] === transientServices[1]);
  }
}
