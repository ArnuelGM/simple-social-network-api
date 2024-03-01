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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(RemovePasswordInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @ApiResponse({ type: User })
  @Get('/')
  profile(@Req() req: Request) {
    return req['user'];
  }

  @ApiResponse({ type: User })
  @Put('/')
  updateProfile(@Req() req: Request, @Body() userDto: UpdateUserDto) {
    return this.userService.updateProfile(req['user'] as User, userDto);
  }

  @ApiResponse({ type: User })
  @Delete('/')
  deleteProfile(@Req() req: Request) {
    return this.userService.removeUser(req['user'] as User);
  }
}
