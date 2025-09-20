import type { Request } from 'express';
import type { Mock } from 'vitest';
import type { PublicationService } from '@/lib/services/publication/PublicationService';
import type { UserService } from '@/lib/services/user/UserService';
import type { IMailer } from '@/lib/types/ports';
import { CreatePublicationUseCase } from '@/lib/use-cases/publication/CreatePublicationUseCase';
import { logger } from '@/lib/utils/logger';
import { TEST_PUBLICATION, TEST_USER } from '@/tests/constants';

const TEST_MAILER_ERROR = new Error('Failed to send email');

vi.mock('@/lib/utils/logger', () => ({
  logger: {
    error: vi.fn(),
  },
}));

const mockPublicationServiceCreate = vi.fn().mockResolvedValue(TEST_PUBLICATION);
const mockUserServiceGetOne = vi.fn().mockResolvedValue(TEST_USER);
const mockMailerSend = vi.fn().mockResolvedValue(undefined);

const mockPublicationService = {
  create: mockPublicationServiceCreate,
} as unknown as PublicationService;

const mockUserService = {
  getOne: mockUserServiceGetOne,
} as unknown as UserService;

describe('CreatePublicationUseCase', () => {
  let request: Partial<Request>;
  let mailer: IMailer & { send: Mock };

  beforeAll(() => {
    request = { body: TEST_PUBLICATION } as unknown as Request;

    mailer = {
      send: mockMailerSend,
    };
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  test('should create user and send email', async () => {
    const createPublicationUseCase = new CreatePublicationUseCase(mockPublicationService, mockUserService, mailer);

    const publication = await createPublicationUseCase.execute(request as Request);

    expect(mockPublicationServiceCreate).toHaveBeenCalledWith(request.body);
    expect(publication).toEqual(TEST_PUBLICATION);
    expect(mailer.send).toHaveBeenCalledWith({
      to: TEST_USER.email,
      subject: 'New publication',
      text: `Hi ${TEST_USER.username}, a new publication has been created`,
    });
  });

  test('should log an error if email sending fails', async () => {
    const createUserUseCase = new CreatePublicationUseCase(mockPublicationService, mockUserService, mailer);

    mailer.send.mockRejectedValueOnce(TEST_MAILER_ERROR);

    await createUserUseCase.execute(request as Request);

    expect(logger.error).toHaveBeenCalledWith(TEST_MAILER_ERROR);
  });
});
