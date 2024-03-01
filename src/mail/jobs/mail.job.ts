import { Inject } from '@nestjs/common';
import { MailService } from '../mail.service';
import { Process, Processor } from '@nestjs/bull';
import { User } from 'src/user/entities/user';
import { Job } from 'bull';

@Processor('mail')
export class MailJob {
  @Inject(MailService)
  mailService: MailService;

  @Process('send-welcome-email')
  async handleSendWelcomeEmail(job: Job<User>) {
    try {
      const user = job.data;
      this.mailService.sendMail(
        user.email,
        'Welcome to SocialNet',
        `
        Hello,
        <br>
        <i>${user.fullName}</i>
        <br>
        <br>
        <p>Welcome to <strong>SocialNet</strong>, </p>
      `,
      );
    } catch (error) {
      console.log('Error al enviar el correo:', error);
    }
  }
}
