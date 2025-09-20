import type { Request } from 'express';
import type { Mock } from 'vitest';
import type { UserService } from '@/lib/services/user/UserService';
import type { IMailer } from '@/lib/types/ports';
import { CreateUserUseCase } from '@/lib/use-cases/user/CreateUserUseCase';
import { logger } from '@/lib/utils/logger';
import { TEST_USER } from '@/tests/constants';

const TEST_MAILER_ERROR = new Error('Failed to send email');

vi.mock('@/lib/utils/logger', () => ({
  logger: {
    error: vi.fn(),
  },
}));

const mockServiceCreate = vi.fn().mockResolvedValue(TEST_USER);
const mockMailerSend = vi.fn().mockResolvedValue(undefined);

const mockUserService = {
  create: mockServiceCreate,
} as unknown as UserService;

describe('CreateUserUseCase', () => {
  let request: Partial<Request>;
  let mailer: IMailer & { send: Mock };

  beforeAll(() => {
    request = { body: TEST_USER } as unknown as Request;

    mailer = {
      send: mockMailerSend,
    };
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  test('should create user and send email', async () => {
    const createUserUseCase = new CreateUserUseCase(mockUserService, mailer);

    const user = await createUserUseCase.execute(request as Request);

    expect(mockServiceCreate).toHaveBeenCalledWith(request.body);
    expect(user).toEqual(TEST_USER);
    expect(mailer.send).toHaveBeenCalledWith({
      to: user.email,
      subject: 'Welcome to our platform',
      text: `Hi ${user.username}, welcome to our platform`,
    });
  });

  test('should log an error if email sending fails', async () => {
    const createUserUseCase = new CreateUserUseCase(mockUserService, mailer);

    mailer.send.mockRejectedValueOnce(TEST_MAILER_ERROR);

    await createUserUseCase.execute(request as Request);

    expect(logger.error).toHaveBeenCalledWith(TEST_MAILER_ERROR);
  });
});
