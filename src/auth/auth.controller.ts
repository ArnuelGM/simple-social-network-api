import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req: Request) {
    return this.authService.login(req['user']);
  }

  @Post('/logout')
  logout() {}

  @Get('/refresh')
  refresToken() {}
}
