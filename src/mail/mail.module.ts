import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { MailJob } from './jobs/mail.job';

@Module({
  imports: [ConfigModule, BullModule.registerQueue({ name: 'mail' })],
  providers: [MailService, MailJob],
  exports: [MailService],
})
export class MailModule {}
