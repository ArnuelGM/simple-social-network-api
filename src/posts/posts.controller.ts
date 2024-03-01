import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post as PostRequest,
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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Post } from './entities/post';

@ApiBearerAuth()
@ApiTags('Posts')
@Controller('post')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(RemovePasswordInterceptor)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiResponse({
    type: Array<Post>,
    description: 'Get list of posts.',
    status: 200,
  })
  @Get('/')
  feed() {
    return this.postsService.feed();
  }

  @ApiResponse({ type: Array<Post> })
  @PostRequest('/')
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
