import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoService } from './services/video.service';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, VideoService, PrismaService],
})
export class AppModule {}
