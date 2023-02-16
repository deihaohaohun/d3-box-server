import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Video, Prisma } from '@prisma/client';

@Injectable()
export class VideoService {
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

  startVideo(id: any) {
    return this.prisma.video.update({
      where: {
        id,
      },
      data: {
        current: 1,
      },
    });
  }

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

  async createVideo(data: Prisma.VideoCreateInput): Promise<Video> {
    return this.prisma.video.create({
      data,
    });
  }

  async getVideos(state: string): Promise<Video[]> {
    let where;
    switch (state) {
      case 'ing':
        where = {
          current: {
            gt: 0,
          },
        };
        break;
      case 'done':
        where = {
          current: -1,
        };
        break;
      case 'not':
        where = {
          current: 0,
        };
        break;

      default:
        break;
    }
    return this.prisma.video.findMany({
      where,
    });
  }
}
