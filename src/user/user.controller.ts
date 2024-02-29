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
import { RemovePasswordInterceptor } from './interceptors/remove-password.interceptor';
import { Request } from 'express';
import { User } from './entities/user';
import { UpdateUserDto } from './dto/user.dto';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(RemovePasswordInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  profile(@Req() req: Request) {
    return req['user'];
  }

  @Put('/')
  updateProfile(@Req() req: Request, @Body() userDto: UpdateUserDto) {
    return this.userService.updateProfile(req['user'] as User, userDto);
  }

  @Delete('/')
  deleteProfile(@Req() req: Request) {
    return this.userService.removeUser(req['user'] as User);
  }
}
