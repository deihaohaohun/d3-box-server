import { Controller, Get, Param, Put } from '@nestjs/common';
import { Video, VideoStatus } from '@prisma/client';
import { R } from 'src/common/r';
import { ResPage } from 'src/common/r-page';
import { PrismaService } from 'src/prisma.service';

@Controller('video')
export class VideoController {
  constructor(private db: PrismaService) {}

  @Get(':status/:page/:size')
  async getAllVideos(
    @Param('status') status: VideoStatus = 'Doing',
    @Param('page') page: number,
    @Param('size') size: number,
  ) {
    const videos = await this.db.video.findMany({
      where: {
        status,
      },
      take: +size,
      skip: (+page - 1) * +size,
    });
    const count = await this.db.video.count({
      where: {
        status,
      },
    });
    return R.success<ResPage<Video>>(
      ResPage.page(videos, count, videos.length === 0 || videos.length < size),
    );
  }

  @Put(':vid')
  async addVideoHistory(@Param('vid') vid: string) {
    const dbVideo = await this.db.video.findUnique({ where: { id: vid } });
    const updatedVideo = await this.db.video.update({
      where: { id: vid },
      data: {
        current: { increment: 1 },
        finishedAt: dbVideo.current === dbVideo.total - 1 ? new Date() : null,
      },
    });
    return R.success<Video>(updatedVideo);
  }

  @Put('finish/:vid')
  async finishVideo(@Param('vid') vid: string) {
    const finishedVideo = await this.db.video.update({
      where: { id: vid },
      data: {
        status: 'Done',
      },
    });
    return R.success<Video>(finishedVideo);
  }
}
