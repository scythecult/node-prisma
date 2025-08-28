import { config } from '@/config';
import type { IMailer } from '@/lib/types/ports';
import { consoleLogMailer } from './console-log-mailer';
import { mailtrapMailer } from './mailtrap-mailer';

let mailer: IMailer = mailtrapMailer;

// Strategy pattern
if (config.consoleLogEmails) {
  mailer = consoleLogMailer;
}

export { mailer };
