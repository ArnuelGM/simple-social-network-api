import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post';
import { Repository } from 'typeorm';
import { PostDto } from './dto/post.dto';
import { Request } from 'express';
import { User } from 'src/user/entities/user';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async getById(id: string) {
    return await this.postRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });
  }

  async feed() {
    const data = await this.postRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: { user: true },
    });

    return data;
  }

  search() {}

  async create(postDto: PostDto, req: Request) {
    const post = new Post();
    Object.assign(post, postDto);
    post.user = req['user'] as User;
    const registeredPost = await this.postRepository.save(post);
    return registeredPost;
  }

  async update(id: string, user: User, postDto: PostDto) {
    const post = await this.getById(id);
    if (!post) {
      throw new NotFoundException('Post not found.');
    }
    if (post.user.id !== user.id) {
      throw new UnauthorizedException('Not allowed.');
    }
    Object.assign(post, postDto);
    await this.postRepository.save(post);
    delete post.user;
    return post;
  }

  async delete(id: string, user: User) {
    const post = await this.getById(id);
    if (!post) {
      throw new NotFoundException('Post not found.');
    }
    if (post.user.id !== user.id) {
      throw new UnauthorizedException('Not allowed.');
    }
    await this.postRepository.softDelete(id);
    delete post.user;
    return post;
  }
}
