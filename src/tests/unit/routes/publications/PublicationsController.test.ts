import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { Mock } from 'vitest';
import type { IComment } from '@/db/types/Comment';
import type { IPublication } from '@/db/types/Publication';
import { publicationService } from '@/lib/services/publication';
import type { CreatePublicationUseCase } from '@/lib/use-cases/publication/CreatePublicationUseCase';
import { PublicationsController } from '@/routes/v1/publications/PublicationsController';
import {
  TEST_COMMENT,
  TEST_DEFAULT_QUERY_LIMIT,
  TEST_PUBLICATION,
  TEST_PUBLICATIONS_WITH_COMMENTS,
  TEST_QUERY_LIMIT,
  TEST_USER,
} from '@/tests/constants';

type PublicationWithComments = IPublication & {
  comments: IComment[];
};

vi.mock('@/lib/services/publication');
vi.mock('@/lib/use-cases/publication/CreatePublicationUseCase.ts');

vi.mocked(publicationService.getAll).mockResolvedValue(
  TEST_PUBLICATIONS_WITH_COMMENTS as unknown as PublicationWithComments[],
);
vi.mocked(publicationService.getPublicationComments).mockResolvedValue([TEST_COMMENT] as unknown as IComment[]);
vi.mocked(publicationService.getOne).mockResolvedValue(TEST_PUBLICATION as unknown as PublicationWithComments);
vi.mocked(publicationService.updateLikeCount).mockResolvedValue({
  ...TEST_PUBLICATION,
  likes: TEST_PUBLICATION.likes + 1,
  is_liked: true,
} as unknown as IPublication);

const mockCreatePublicationUseCaseExecute = vi.fn().mockResolvedValue(TEST_PUBLICATION);

const mockCreatePublicationUseCase = {
  execute: mockCreatePublicationUseCaseExecute,
} as unknown as CreatePublicationUseCase;

describe('PublicationsController', () => {
  let publicationsController: PublicationsController;
  let request: Partial<Request>;
  let response: Partial<Response>;
  let mockResponseJson: Mock;
  let mockResponseStatus: Mock;

  beforeEach(() => {
    publicationsController = new PublicationsController(publicationService, {
      createPublication: mockCreatePublicationUseCase,
    });

    // Mock below equals code like this:
    // response.status([StatusCode]).json([data]);
    mockResponseJson = vi.fn();
    mockResponseStatus = vi.fn().mockReturnValue({ json: mockResponseJson });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  describe('listPublications', () => {
    beforeEach(() => {
      request = { query: TEST_QUERY_LIMIT, auth: { payload: { id: TEST_USER.id } } } as unknown as Request;

      response = { status: mockResponseStatus } as unknown as Response;
    });

    test('should list publications', async () => {
      await publicationsController.listPublications(request as Request, response as Response);

      expect(publicationService.getAll).toHaveBeenCalledWith(TEST_USER.id, TEST_QUERY_LIMIT);
      expect(mockResponseStatus).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponseJson).toHaveBeenCalledWith(TEST_PUBLICATIONS_WITH_COMMENTS);
    });

    test('should list users with default limit and offset', async () => {
      request = { query: {}, auth: { payload: { id: TEST_USER.id } } } as unknown as Request;

      await publicationsController.listPublications(request as Request, response as Response);

      expect(publicationService.getAll).toHaveBeenCalledWith(TEST_USER.id, TEST_DEFAULT_QUERY_LIMIT);
      expect(mockResponseStatus).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponseJson).toHaveBeenCalledWith(TEST_PUBLICATIONS_WITH_COMMENTS);
    });
  });

  describe('listPublicationComments', () => {
    beforeEach(() => {
      request = { params: { id: TEST_PUBLICATION.id }, auth: { payload: { id: TEST_USER.id } } } as unknown as Request;

      response = { status: mockResponseStatus } as unknown as Response;
    });

    test('should list publication comments', async () => {
      await publicationsController.listPublicationComments(request as Request, response as Response);

      expect(publicationService.getPublicationComments).toHaveBeenCalledWith(TEST_PUBLICATION.id, TEST_USER.id);
      expect(mockResponseStatus).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponseJson).toHaveBeenCalledWith([TEST_COMMENT]);
    });
  });

  describe('getPublication', () => {
    beforeEach(() => {
      request = { params: { id: TEST_PUBLICATION.id }, auth: { payload: { id: TEST_USER.id } } } as unknown as Request;

      response = { status: mockResponseStatus } as unknown as Response;
    });

    test('should get publication', async () => {
      await publicationsController.getPublication(request as Request, response as Response);

      expect(publicationService.getOne).toHaveBeenCalledWith(TEST_PUBLICATION.id, TEST_USER.id);
      expect(mockResponseStatus).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponseJson).toHaveBeenCalledWith(TEST_PUBLICATION);
    });
  });

  describe('createPublication', () => {
    beforeEach(() => {
      request = { body: TEST_PUBLICATION };

      response = { status: mockResponseStatus } as unknown as Response;
    });

    test('should create publication', async () => {
      await publicationsController.createPublication(request as Request, response as Response);

      expect(mockCreatePublicationUseCaseExecute).toHaveBeenCalledOnce();
      expect(mockCreatePublicationUseCaseExecute).toHaveBeenCalledWith(request);
      expect(mockResponseStatus).toHaveBeenCalledWith(StatusCodes.CREATED);
      expect(mockResponseJson).toHaveBeenCalledWith(TEST_PUBLICATION);
    });
  });

  describe('updateLikeCount', () => {
    beforeEach(() => {
      request = { params: { id: TEST_PUBLICATION.id }, auth: { payload: { id: TEST_USER.id } } } as unknown as Request;

      response = { status: mockResponseStatus } as unknown as Response;
    });

    test('should update like count and is_liked flag', async () => {
      await publicationsController.updateLikeCount(request as Request, response as Response);

      expect(publicationService.updateLikeCount).toHaveBeenLastCalledWith(TEST_PUBLICATION.id, TEST_USER.id);
      expect(mockResponseStatus).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponseJson).not.toHaveBeenCalledWith(TEST_PUBLICATION);
      expect(mockResponseJson).not.toContainEqual(TEST_PUBLICATION);
    });
  });
});
