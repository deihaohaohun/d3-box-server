import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [VideoController],
  providers: [VideoService, PrismaService],
})
export class VideoModule {}
