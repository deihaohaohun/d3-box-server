import { Body, Controller, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BangumiService } from './services/video.service';

@Controller()
export class AppController {
  constructor(private readonly bangumiService: BangumiService) {}

  @Post('video')
  getHello(@Body() video: Prisma.VideoCreateInput): string {
    this.bangumiService.createUser(video);
    return 'created successfully.';
  }
}
