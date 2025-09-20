import { config } from '@/config';

describe('mailer strategy', () => {
  // clear cache before each test
  afterEach(() => {
    vi.resetModules();
  });

  test('should use mailtrapMailer', async () => {
    vi.doMock('@/config', () => ({
      config: { ...config, consoleLogEmails: false },
    }));

    const { mailer } = await import('@/lib/services/mailer/index');
    const { mailtrapMailer } = await import('@/lib/services/mailer/mailtrap-mailer');

    expect(mailer).toBe(mailtrapMailer);
  });

  test('should use consoleInfoMailer', async () => {
    vi.doMock('@/config', () => ({
      config: { ...config, consoleLogEmails: true },
    }));

    const { mailer } = await import('@/lib/services/mailer/index');
    const { consoleInfoMailer } = await import('@/lib/services/mailer/console-info-mailer');

    expect(mailer).toBe(consoleInfoMailer);
  });
});
