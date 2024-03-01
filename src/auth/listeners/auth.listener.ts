import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bull';
import { User } from 'src/user/entities/user';

@Injectable()
export class AuthListener {
  constructor(
    @InjectQueue('mail')
    private readonly mailQueue: Queue,
  ) {}

  @OnEvent('auth.registered')
  handleUserRegistered(user: User) {
    this.mailQueue.add('send-welcome-email', user);
  }
}
