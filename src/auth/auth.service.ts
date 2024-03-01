import { UserService } from './../user/user.service';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private userService: UserService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const { password, ...userData } = user;
      if (await user.validatePassword(pass)) return userData;
    }
    return null;
  }

  async register(userDto: UserDto) {

    const { password, passwordConfirmation } = userDto;
    if (password != passwordConfirmation) {
      throw new BadRequestException('Passwords must be equals.');
    }

    const { email } = userDto;
    const userExists = await this.userRepository.findOneBy({ email });
    if (userExists) {
      throw new ConflictException(`User with email ${email} already exists.`);
    }

    const user = new User();
    Object.assign(user, userDto);
    user.password = await user.createPassword(userDto.password);
    const registeredUser = await this.userRepository.save(user);
    // TODO: enqueue welcome email
    return registeredUser;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });
    return { access_token, refresh_token };
  }
}
