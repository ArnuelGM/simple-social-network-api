import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';

@Controller('post')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/')
  feed() {
    return 'aqui';
  }

  @Post('/')
  createPost(@Body() postDto: PostDto) {
    return this.postsService.create(postDto);
  }
}
