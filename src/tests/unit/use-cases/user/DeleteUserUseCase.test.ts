import type { Request } from 'express';
import type { Mock } from 'vitest';
import type { UserService } from '@/lib/services/user/UserService';
import type { IMailer } from '@/lib/types/ports';
import { DeleteUserUseCase } from '@/lib/use-cases/user/DeleteUserUseCase';
import { logger } from '@/lib/utils/logger';
import { TEST_USER } from '@/tests/constants';

const TEST_MAILER_ERROR = new Error('Failed to send email');

vi.mock('@/lib/utils/logger', () => ({
  logger: {
    error: vi.fn(),
  },
}));

const mockServiceDelete = vi.fn().mockResolvedValue(TEST_USER);
const mockMailerSend = vi.fn().mockResolvedValue(undefined);

const mockUserService = {
  delete: mockServiceDelete,
} as unknown as UserService;

describe('DeleteUserUseCase', () => {
  let request: Partial<Request>;
  let mailer: IMailer & { send: Mock };

  beforeAll(() => {
    request = { params: { id: TEST_USER.id } } as unknown as Request;

    mailer = {
      send: mockMailerSend,
    };
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  test('should create user and send email', async () => {
    const deleteUserUseCase = new DeleteUserUseCase(mockUserService, mailer);

    const user = await deleteUserUseCase.execute(request as Request);

    expect(mockServiceDelete).toHaveBeenCalledWith(TEST_USER.id);
    expect(user).toEqual(TEST_USER);
    expect(mailer.send).toHaveBeenCalledWith({
      to: user.email,
      subject: 'Farewell message',
      text: `Hi ${user.username}, we're sorry to see you go`,
    });
  });

  test('should log an error if email sending fails', async () => {
    const createUserUseCase = new DeleteUserUseCase(mockUserService, mailer);

    mailer.send.mockRejectedValueOnce(TEST_MAILER_ERROR);

    await createUserUseCase.execute(request as Request);

    expect(logger.error).toHaveBeenCalledWith(TEST_MAILER_ERROR);
  });
});
