//posts/posts.controller.ts

import { Controller, Get, Post, Body, Param,  Res, Render, Req, Patch, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Response } from 'express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(
      @Body() createPostDto: CreatePostDto,
      @Res() res: Response
  ) {
      await this.postsService.create(createPostDto);
      return res.redirect('/posts');  
  }

  @Patch(':id')
  async updatePost(
      @Param('id') id: string,
      @Body() updatePostDto: UpdatePostDto,
      @Res() res: Response
  ) {
      await this.postsService.update(+id, updatePostDto);
      return res.redirect('/posts');
  }

  @Delete(':id')
  async removePost(
      @Param('id') id: string,
      @Res() res: Response
  ) {
      await this.postsService.remove(+id);
      return res.redirect('/posts');
  }

  @Get()
  @Render('feed')
  async root() {
      const posts = await this.postsService.findAll();
      return { message: 'Feed', posts };
  }
}
