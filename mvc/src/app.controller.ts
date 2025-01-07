// src/app.controller.ts
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('home')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async root() {
    const users = await this.appService.getUsers();
    return { message: 'User List', users };
  }

  @Get('data')
  async getData() {
    const users = await this.appService.getUsers();
    return { users }; 
  }
}
