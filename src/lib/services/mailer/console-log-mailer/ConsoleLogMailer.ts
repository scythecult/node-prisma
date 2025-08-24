import type { Mailer, MailNotification } from '@/lib/types/ports';

export class ConsoleLogMailer implements Mailer {
  public async send(mailNotification: MailNotification): Promise<void> {
    console.info(mailNotification.text);
  }
}
