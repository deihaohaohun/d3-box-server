import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, Account } from '@prisma/client';

@Injectable()
export class AccountService {
  addEpisode(id: any) {
    return this.prisma.video.update({
      where: {
        id,
      },
      data: {
        current: {
          increment: 1,
        },
      },
    });
  }
  constructor(private prisma: PrismaService) {}

  finishVideo(id: any) {
    return this.prisma.video.update({
      where: {
        id,
      },
      data: {
        current: -1,
        end: new Date(),
      },
    });
  }

  async createAccount(
    data: Prisma.AccountCreateInput[],
  ): Promise<Prisma.BatchPayload> {
    return this.prisma.account.createMany({
      data,
    });
  }

  async getAccounts(): Promise<Account[]> {
    return this.prisma.account.findMany({
      include: {
        keywords: true,
      },
    });
  }

  async updateAccountKeywords(id, keywords: Prisma.KeywordCreateInput[]) {
    return await this.prisma.account.update({
      where: {
        id,
      },
      data: {
        keywords: {
          createMany: {
            data: keywords,
          },
        },
      },
    });
  }
}
