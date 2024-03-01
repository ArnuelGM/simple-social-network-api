import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async updateProfile(user: User, userData: UpdateUserDto) {
    if (!(await user.validatePassword(userData.currentPassword))) {
      throw new UnauthorizedException('Invalid current password.');
    }

    Object.assign(user, userData);

    const { password, passwordConfirmation } = userData;
    if (password && passwordConfirmation && password === passwordConfirmation) {
      user.password = await user.createPassword(userData.password);
    } else if (password && !passwordConfirmation) {
      throw new BadRequestException('Password must be confirmed.');
    } else if (
      password &&
      passwordConfirmation &&
      password !== passwordConfirmation
    ) {
      throw new BadRequestException('Passwords must be equal.');
    }

    await this.userRepository.save(user);

    return user;
  }

  async removeUser(user: User) {
    return await this.userRepository.softDelete(user.id);
  }
}
