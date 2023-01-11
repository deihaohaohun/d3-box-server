import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Video, Prisma } from '@prisma/client';

@Injectable()
export class BangumiService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.VideoCreateInput): Promise<Video> {
    return this.prisma.video.create({
      data,
    });
  }
}
