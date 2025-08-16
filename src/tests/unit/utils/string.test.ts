import { capitalize } from '@/lib/utils/string';

describe('string', () => {
  test('capitalize', () => {
    expect(capitalize('hello')).toBe('Hello');
  });
});
