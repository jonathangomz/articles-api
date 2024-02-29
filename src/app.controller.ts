import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ArticleType } from './Article';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
