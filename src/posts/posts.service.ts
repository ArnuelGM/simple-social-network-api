import { Injectable } from '@nestjs/common';
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

  async feed() {
    const [data] = await this.postRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      relations: { user: true },
      /* skip,
      take */
    });

    return {
      data,
      /* meta: {
        page: page,
        perPage: perPage,
        total,
        count: data.length,
        totalPages: Math.ceil(total / perPage),
      }, */
    };
  }

  search() {}

  async create(postDto: PostDto, req: Request) {
    const post = new Post();
    Object.assign(post, postDto);
    post.user = req['user'] as User;
    const registeredPost = await this.postRepository.save(post);
    return registeredPost;
  }

  update() {}

  delete() {}
}
