import type { IUser } from '@/db/types/User';
import { User } from '@/lib/entities/User';

const PLAIN_PASSWORD = 'password';

const BCRYPT_HASHED_PASSWORD_REGEXP = /^\$2[aby]\$/;

const MOCK_USER: IUser = {
  id: 'id',
  user_id: 'user_id',
  email: 'email',
  username: 'username',
  password: PLAIN_PASSWORD,
  fullname: 'fullname',
  birthdate: new Date(),
  avatar_url: 'avatar_url',
  created_at: new Date(),
  updated_at: new Date(),
};

const user = new User(MOCK_USER);

describe('User', () => {
  describe('constructor', () => {
    test('should have constructor', () => {
      expect(user).toBeInstanceOf(User);
    });

    test('should initialize with correct properties', () => {
      expect(user.id).toBe(MOCK_USER.id);
      expect(user.user_id).toBe(MOCK_USER.user_id);
      expect(user.email).toBe(MOCK_USER.email);
      expect(user.username).toBe(MOCK_USER.username);
      expect(user.password).toBe(MOCK_USER.password);
      expect(user.fullname).toBe(MOCK_USER.fullname);
      expect(user.birthdate).toBe(MOCK_USER.birthdate);
      expect(user.avatar_url).toBe(MOCK_USER.avatar_url);
      expect(user.created_at).toBe(MOCK_USER.created_at);
      expect(user.updated_at).toBe(MOCK_USER.updated_at);
    });
  });

  describe('hashPassword', () => {
    test('should have hashPassword method', () => {
      expect(user).toHaveProperty('hashPassword');
    });

    test('should hash password', async () => {
      await user.hashPassword();

      expect(user.password).not.toBe(PLAIN_PASSWORD);
      expect(user.password).toMatch(BCRYPT_HASHED_PASSWORD_REGEXP);
    });
  });

  describe('getAsDto', () => {
    test('should have getAsDto method', () => {
      expect(user).toHaveProperty('getAsDto');
    });

    test('should return entity as dto', () => {
      expect(user.getAsDto()).toBe(user);
    });
  });
});
