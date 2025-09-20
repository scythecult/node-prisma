import { config } from '@/config';
import type { IMailer } from '@/lib/types/ports';
import { consoleInfoMailer } from './console-info-mailer';
import { mailtrapMailer } from './mailtrap-mailer';

let mailer: IMailer = mailtrapMailer;

// Strategy pattern
if (config.consoleLogEmails) {
  mailer = consoleInfoMailer;
}

export { mailer };
