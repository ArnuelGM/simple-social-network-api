import { Injectable } from '@nestjs/common';
import { User } from './entities/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }
}
