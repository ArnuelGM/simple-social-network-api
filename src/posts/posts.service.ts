import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post';
import { Repository } from 'typeorm';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  feed() {}

  search() {}

  async create(postDto: PostDto) {
    const post = new Post();
    Object.assign(post, postDto);
    const registeredPost = await this.postRepository.save(post);
    return registeredPost;
  }

  update() {}

  delete() {}
}
