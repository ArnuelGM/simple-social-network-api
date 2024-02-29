import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RemovePasswordInterceptor } from './remove-password.interceptor';
import { Request } from 'express';
import { User } from './entities/user';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  @UseInterceptors(RemovePasswordInterceptor)
  profile(@Req() req: Request) {
    return req['user'];
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/')
  @UseInterceptors(RemovePasswordInterceptor)
  updateProfile(@Req() req: Request, @Body() userDto: UserDto) {
    return this.userService.updateProfile(req['user'] as User, userDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/')
  @UseInterceptors(RemovePasswordInterceptor)
  deleteProfile(@Req() req: Request) {
    return this.userService.removeUser(req['user'] as User);
  }
}
