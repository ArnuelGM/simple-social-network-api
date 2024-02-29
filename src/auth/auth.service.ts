import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const { password, ...userData } = user;
      if (await bcrypt.compare(pass, password)) return userData;
    }
    return null;
  }

  async register(userDto: UserDto) {
    const user = new User();
    Object.assign(user, userDto);
    user.password = await bcrypt.hash(user.password, 10);
    const registeredUser = await this.userRepository.save(user);
    // TODO: enqueue welcome email
    return registeredUser;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
