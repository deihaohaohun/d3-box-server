import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

  @Get('video/:state')
  async getVideos(
    @Param('state') state: 'ing' | 'done' | 'not',
  ): Promise<Video[]> {
    return this.bangumiService.getVideos(state);
  }

  @Put('video/:id')
  async addEpisode(@Param('id') id) {
    await this.bangumiService.addEpisode(id);
    return true;
  }

  @Put('video/finish/:id')
  async finishVideo(@Param('id') id) {
    await this.bangumiService.finishVideo(id);
    return true;
  }

  @Put('video/start/:id')
  async startVideo(@Param('id') id) {
    await this.bangumiService.startVideo(id);
    return true;
  }
}
