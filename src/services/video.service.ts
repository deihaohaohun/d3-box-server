import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Video, Prisma } from '@prisma/client';

@Injectable()
export class VideoService {
  constructor(private prisma: PrismaService) {}

  async createVideo(data: Prisma.VideoCreateInput): Promise<Video> {
    return this.prisma.video.create({
      data,
    });
  }

  async getVideos(): Promise<Video[]> {
    return this.prisma.video.findMany();
  }
}
