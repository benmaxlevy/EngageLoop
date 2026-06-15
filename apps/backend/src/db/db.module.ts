import { Global, Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { PRISMA_TOKEN } from '../lib/tokens';
import { prisma } from '@repo/db';

@Global()
@Module({
  providers: [
    {
      provide: PRISMA_TOKEN,
      useValue: prisma,
    },
  ],
  exports: [PRISMA_TOKEN],
})
export class DbModule implements OnModuleDestroy {
  constructor(@Inject(PRISMA_TOKEN) private readonly db: typeof prisma) {}

  async onModuleDestroy() {
    await this.db.$disconnect();
  }
}
