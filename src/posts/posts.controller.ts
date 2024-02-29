import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserInterceptor } from 'src/user/user.interceptor';
import { User } from 'src/user/entities/user';

@Controller('post')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  @UseInterceptors(UserInterceptor)
  feed() {
    return this.postsService.feed();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  createPost(@Body() postDto: PostDto, @Req() req: Request) {
    return this.postsService.create(postDto, req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  updatePost(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() postDto: PostDto,
  ) {
    return this.postsService.update(id, req['user'] as User, postDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  deletePost(@Req() req: Request, @Param('id') id: string) {
    return this.postsService.delete(id, req['user'] as User);
  }
}
