import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoService } from './services/video.service';
import { PrismaService } from './services/prisma.service';
import { AccountController } from './modules/account/account.controller';
import { AccountService } from './services/account.service';

@Module({
  imports: [],
  controllers: [AppController, AccountController],
  providers: [AppService, VideoService, AccountService, PrismaService],
})
export class AppModule {}
