import { Body, Controller, Get, Post } from '@nestjs/common';
import { Video } from '@prisma/client';
import { VideoService } from './services/video.service';

@Controller()
export class AppController {
  constructor(private readonly bangumiService: VideoService) {}

  @Post('video')
  async createVideo(@Body() video: Video): Promise<string> {
    try {
      await this.bangumiService.createVideo(video);
    } catch (e) {
      return '创建失败';
    }
    return '创建成功';
  }

  @Get('video')
  async getVideos(): Promise<Video[]> {
    return this.bangumiService.getVideos();
  }
}
