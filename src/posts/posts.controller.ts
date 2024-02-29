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
import { RemovePasswordInterceptor } from 'src/user/interceptors/remove-password.interceptor';
import { User } from 'src/user/entities/user';

@Controller('post')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(RemovePasswordInterceptor)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/')
  feed() {
    return this.postsService.feed();
  }

  @Post('/')
  createPost(@Body() postDto: PostDto, @Req() req: Request) {
    return this.postsService.create(postDto, req);
  }

  @Put('/:id')
  updatePost(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() postDto: PostDto,
  ) {
    return this.postsService.update(id, req['user'] as User, postDto);
  }

  @Delete('/:id')
  deletePost(@Req() req: Request, @Param('id') id: string) {
    return this.postsService.delete(id, req['user'] as User);
  }
}
