// src/app.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async getPosts() {
    return await this.prisma.post.findMany(
      { include: { author: true, comments: { include: { author: true } } } },
    );
  }
}


