import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), PassportModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
