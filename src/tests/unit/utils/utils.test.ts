import { getErrorMessage } from '@/lib/utils/utils';

describe('utils', () => {
  test('getErrorMessage', () => {
    expect(getErrorMessage(new Error('error'))).toBe('error');
    expect(getErrorMessage({ message: 'error' })).toBe('error');
    expect(getErrorMessage('error')).toBe('error');
    expect(getErrorMessage({})).toBe('An error occured');
  });
});
