import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RemovePasswordInterceptor } from './remove-password.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RemovePasswordInterceptor,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
