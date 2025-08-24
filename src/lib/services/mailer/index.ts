import { config } from '@/lib/constants/config';
import type { Mailer } from '@/lib/types/ports';
import { consoleLogMailer } from './console-log-mailer';
import { mailtrapMailer } from './mailtrap-mailer';

let mailer: Mailer = mailtrapMailer;

// Strategy pattern
if (config.consoleLogEmails) {
  mailer = consoleLogMailer;
}

export { mailer };
