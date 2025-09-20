import { AuthenticationError } from '@/lib/errors/AuthenticationError';
import { CustomError } from '@/lib/errors/CustomError';

describe('AuthenticationError', () => {
  test('should inherit from Error', () => {
    expect(Object.getPrototypeOf(AuthenticationError) === CustomError).toBeTruthy();
  });
});
