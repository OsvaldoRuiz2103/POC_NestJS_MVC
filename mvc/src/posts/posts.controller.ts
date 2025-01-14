import { Controller, Get, Post, Body, Param,  Res, Render, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request, Response } from 'express';

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

  //This endpoint handles PATCH and DELETE requests because the HTML form's method attribute is limited to GET or POST 
  @Post(':id')
  async updateOrDeletePost(
      @Param('id') id: string,
      @Body() bodyRequest: UpdatePostDto,
      @Res() res: Response
  ) {
      const { _method, ...body } = bodyRequest;

      if (_method === 'PATCH') {
          await this.postsService.update(+id, body);
      } else if (_method === 'DELETE') {
          await this.postsService.remove(+id);
      }

      return res.redirect('/posts');
  }

  @Get()
  @Render('feed')
  async root() {
      const posts = await this.postsService.findAll();
      return { message: 'Feed', posts };
  }
}
