import { Writable } from 'node:stream';
import type { Logger } from 'winston';
import winston from 'winston';
import { logFormatter, logger } from '@/lib/utils/logger';

const LOG_MESSAGE = 'test';
const LOGGER_METHODS = ['error', 'warning', 'info', 'http', 'debug'] as const;

const createTestLogger = () => {
  let output = '';

  const writable = new Writable({
    write(chunk, _encoding, callback) {
      output += chunk.toString();
      callback();
    },
  });

  const logger = winston.createLogger({
    levels: { error: 0, info: 1 },
    level: 'info',
    format: winston.format.printf(logFormatter),
    transports: [new winston.transports.Stream({ stream: writable })],
  });

  return { logger, getOutput: () => output };
};

describe('logger', () => {
  describe('logFormatter', () => {
    test('should return formatted log message', () => {
      const log = logFormatter({ timestamp: '2023-01-01', level: 'info', message: 'Hello world' });
      expect(log).toBe('2023-01-01 info:  Hello world ');
    });

    test('shoud logs formatted message with metadata', () => {
      const { logger, getOutput } = createTestLogger();

      logger.info('Hello world', { logMetadata: 'User=123' });

      const log = getOutput();
      expect(log).toContain('info: User=123 Hello world');
    });

    test('shoud logs formatted message with metadata empty', () => {
      const { logger, getOutput } = createTestLogger();

      logger.info('Hello world');

      const log = getOutput();
      expect(log).toContain('info:  Hello world');
    });
  });

  LOGGER_METHODS.forEach((method) => {
    describe(`${method} method`, () => {
      const loggerMock = vi.spyOn(logger, method).mockImplementation(() => undefined as unknown as Logger);

      afterAll(() => {
        loggerMock.mockReset();
      });

      test(`should properly log ${method} message`, () => {
        logger[method](LOG_MESSAGE);

        expect(loggerMock).toHaveBeenCalledOnce();
        expect(loggerMock).toHaveBeenCalledWith(LOG_MESSAGE);
      });
    });
  });
});
