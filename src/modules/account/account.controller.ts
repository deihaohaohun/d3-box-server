import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Account, Keyword } from '@prisma/client';
import { AccountService } from '../../services/account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('')
  async createVideo(@Body() account: Account[]): Promise<string> {
    try {
      await this.accountService.createAccount(account);
    } catch (e) {
      console.log(e);
      return '创建失败';
    }
    return '创建成功';
  }

  @Get('')
  async getVideos(): Promise<Account[]> {
    return this.accountService.getAccounts();
  }

  @Put('video/:id')
  async addEpisode(@Param('id') id) {
    await this.accountService.addEpisode(id);
    return true;
  }

  @Put(':id')
  async finishVideo(@Param('id') id, @Body() keywords: Keyword[]) {
    try {
      await this.accountService.updateAccountKeywords(id, keywords);
    } catch (error) {
      console.log(error);

      return false;
    }
    return true;
  }
}
