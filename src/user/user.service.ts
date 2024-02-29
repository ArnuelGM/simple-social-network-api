import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async updateProfile(user: User, userData: UserDto) {
    const { password, passwordConfirmation } = userData;

    if (password && !passwordConfirmation) {
      throw new UnauthorizedException('Passsword most be confirmed.');
    }

    if (password && passwordConfirmation && password !== passwordConfirmation) {
      throw new UnauthorizedException('Passswords most be equals.');
    }

    Object.assign(user, userData);
    return await this.userRepository.save(user);
  }

  async removeUser(user: User) {
    return await this.userRepository.softDelete(user.id);
  }
}
