import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { config } from '@/config';
import type { IMailer, IMailNotification } from '@/lib/types/ports';

export class MailtrapMailer implements IMailer {
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

  async send(mailNotification: IMailNotification): Promise<void> {
    await this.transporter.sendMail({
      from: '"Photorama" <notifications@photorama.com>',
      to: mailNotification.to,
      subject: mailNotification.subject,
      text: mailNotification.text,
      html: mailNotification.html,
    });
  }
}
