// src/app.controller.ts
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('feed')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('feed')
  async root() {
    const posts = await this.appService.getPosts();
    return { message: 'Feed', posts };
  }
}
