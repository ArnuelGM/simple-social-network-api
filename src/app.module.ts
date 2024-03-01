import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { DB_MODULE } from './database/database.config';
import { MailModule } from './mail/mail.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { QUEUE_MODULE } from './queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DB_MODULE,
    AuthModule,
    UserModule,
    PostsModule,
    MailModule,
    EventEmitterModule.forRoot(),
    QUEUE_MODULE,
  ],
  // controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
