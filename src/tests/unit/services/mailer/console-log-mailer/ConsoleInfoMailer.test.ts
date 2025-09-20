import { ConsoleInfoMailer } from '@/lib/services/mailer/console-info-mailer/ConsoleInfoMailer';
import { TEST_MAIL_NOTIFICATION } from '@/tests/constants';

const mockConsoleInfo = vi.fn();
const mockConsoleLog = vi.fn();

console.info = mockConsoleInfo;
// eslint-disable-next-line no-console
console.log = mockConsoleLog;

describe('ConsoleInfoMailer', () => {
  let mailer: ConsoleInfoMailer;

  beforeAll(() => {
    mailer = new ConsoleInfoMailer();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  test('should be instance of ConsoleInfoMailer', () => {
    expect(mailer).toBeInstanceOf(ConsoleInfoMailer);
  });

  test('should have send method', () => {
    expect(mailer).toHaveProperty('send');
  });

  test('should print message', async () => {
    await mailer.send(TEST_MAIL_NOTIFICATION);

    expect(mockConsoleLog).not.toHaveBeenCalled();
    expect(mockConsoleInfo).toHaveBeenCalledOnce();
    expect(mockConsoleInfo).toHaveBeenCalledWith(TEST_MAIL_NOTIFICATION.text);
  });
});
