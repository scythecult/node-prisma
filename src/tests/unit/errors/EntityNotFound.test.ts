import { CustomError } from '@/lib/errors/CustomError';
import { EntityNotFound } from '@/lib/errors/EntityNotFound';

describe('EntityNotFound', () => {
  test('should inherit from Error', () => {
    expect(Object.getPrototypeOf(EntityNotFound) === CustomError).toBeTruthy();
  });
});
