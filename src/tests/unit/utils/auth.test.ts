import { comparePasswords, createJWT, hashPassword, verifyJWT } from '@/lib/utils/auth';

const USER_ID = 'id';
const ORIGINAL_PASSWORD = 'password';

describe('auth', () => {
  describe('createJWT', () => {
    test('should create JWT properly', async () => {
      expect(await createJWT(USER_ID)).not.toBe(USER_ID);
    });
  });

  describe('verifyJWT', () => {
    let token: string;

    beforeAll(async () => {
      token = await createJWT(USER_ID);
    });

    test('should verify JWT properly', async () => {
      expect(await verifyJWT(token)).toBeTruthy();
    });
  });

  describe('comparePasswords', () => {
    let hashedPassword: string;

    beforeAll(async () => {
      hashedPassword = await hashPassword(ORIGINAL_PASSWORD);
    });

    test('should compare passwords properly', async () => {
      expect(await comparePasswords(ORIGINAL_PASSWORD, hashedPassword)).toBeTruthy();
    });
  });

  describe('hashPassword', () => {
    test('should hash password properly', async () => {
      expect(await hashPassword(ORIGINAL_PASSWORD)).not.toBe(ORIGINAL_PASSWORD);
    });
  });
});
