import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() userDto: UserDto) {
    const { password, passwordConfirmation } = userDto;

    if (password !== passwordConfirmation) {
      throw new UnauthorizedException('Passswords most be equals.');
    }

    await this.authService.register(userDto);

    return { ok: true };
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/logout')
  logout() {}

  @Get('/refresh')
  refresToken() {}
}
