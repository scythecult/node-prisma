import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { config } from '@/lib/constants/config';
import type { Mailer, MailNotification } from '@/lib/types/ports';

export class MailtrapMailer implements Mailer {
  protected transporter;

  constructor() {
    const options: SMTPTransport.Options = {
      host: config.mail.host,
      port: config.mail.port,
      auth: {
        user: config.mail.username,
        pass: config.mail.password,
      },
    };

    this.transporter = nodemailer.createTransport(options);
  }

  async send(mailNotification: MailNotification): Promise<void> {
    await this.transporter.sendMail({
      from: '"Photorama" <notifications@photorama.com>',
      to: mailNotification.to,
      subject: mailNotification.subject,
      text: mailNotification.text,
      html: mailNotification.html,
    });
  }
}
