import { PrismaClient } from '.prisma/client';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: any) {
    // @ts-expect-error - $on is not typed in PrismaClient
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
