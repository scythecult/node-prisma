export interface MailNotification {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export interface Mailer {
  send: (notification: MailNotification) => Promise<void>;
}
