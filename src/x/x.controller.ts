import { Controller, Get, Query } from '@nestjs/common';
import { XService } from './x.service';

@Controller('x')
export class XController {
  constructor(private readonly XService: XService) {}

  @Get('tweets')
  getTweet(@Query('account') account: string) {
    return this.XService.getLastTweet(account)

  }
}
