import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  feed() {
    return 'aqui';
  }

  @Post('/')
  createPost(@Body() postDto: PostDto) {
    return this.postsService.create(postDto);
  }
}
