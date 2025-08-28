import type { IMailer, IMailNotification } from '@/lib/types/ports';

export class ConsoleLogMailer implements IMailer {
  public async send(mailNotification: IMailNotification): Promise<void> {
    console.info(mailNotification.text);
  }
}
