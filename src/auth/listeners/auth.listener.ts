import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailService } from 'src/mail/mail.service';
import { User } from 'src/user/entities/user';

@Injectable()
export class AuthListener {
  constructor(private mailService: MailService) {}

  @OnEvent('auth.registered')
  handleUserRegistered(user: User) {
    try {
      this.mailService.sendMail(
        user.email,
        'Welcome to SocialNet',
        `
        Hello, ${user.fullName}
        <br>
        Welcome to <strong>SocialNet</strong>
      `,
      );
    } catch (error) {
      console.log('Error al enviar el correo:', error);
    }
  }
}
