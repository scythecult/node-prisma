import { CustomError } from '@/lib/errors/CustomError';

const MOCK_ERROR = {
  statusCode: 401,
  message: 'Authentication error',
  code: 'ERR_AUTH' as ErrorCode,
};

const customError = new CustomError(MOCK_ERROR);

describe('CustomError', () => {
  test('should inherit from Error', () => {
    expect(Object.getPrototypeOf(CustomError) === Error).toBeTruthy();
  });

  test('should throw error', () => {
    expect(() => {
      throw customError;
    }).toThrow(customError);
  });

  describe('constructor', () => {
    test('should have constructor', () => {
      expect(customError).toBeInstanceOf(CustomError);
    });

    test('should have correct properties', () => {
      expect(customError.statusCode).toBe(MOCK_ERROR.statusCode);
      expect(customError.message).toBe(MOCK_ERROR.message);
      expect(customError.code).toBe(MOCK_ERROR.code);
    });
  });
});
