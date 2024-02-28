import { LoginDto } from './dto/login.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
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
  ) {}

  async register(userDto: UserDto) {
    const user = new User();
    Object.assign(user, userDto);
    user.password = await bcrypt.hash(user.password, 10);
    const registeredUser = await this.userRepository.save(user);
    // TODO: enqueue welcome email
    return registeredUser;
  }

  async login(loginDto: LoginDto) {
    const { password, email } = loginDto;
    const user = await this.userRepository.findOneBy({ email });

    // console.log(user);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
