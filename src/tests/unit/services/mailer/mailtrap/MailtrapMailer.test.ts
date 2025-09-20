import nodemailer from 'nodemailer';
import { config } from '@/config';
import { MailtrapMailer } from '@/lib/services/mailer/mailtrap-mailer/MailtrapMailer';
import { TEST_MAIL_NOTIFICATION } from '@/tests/constants';

const mockMailerSend = vi.fn().mockResolvedValue('Email sent successfully');

vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail: mockMailerSend,
    })),
  },
}));

describe('MailtrapMailer', () => {
  let mailer: MailtrapMailer;

  beforeAll(() => {
    mailer = new MailtrapMailer();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  test('should have send method', () => {
    expect(mailer).toHaveProperty('send');
  });

  test('should send email with correct parameters', async () => {
    await mailer.send(TEST_MAIL_NOTIFICATION);

    expect(mockMailerSend).toHaveBeenCalledOnce();
    expect(mockMailerSend).toHaveBeenCalledWith({
      ...TEST_MAIL_NOTIFICATION,
      from: '"Photorama" <notifications@photorama.com>',
    });
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: config.mail.host,
      port: config.mail.port,
      auth: {
        user: config.mail.username,
        pass: config.mail.password,
      },
    });
  });
});
