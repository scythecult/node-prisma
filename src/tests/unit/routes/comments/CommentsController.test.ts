import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { Mock } from 'vitest';
import type { IComment } from '@/db/types/Comment';
import { commentService } from '@/lib/services/comment';
import { CommentsController } from '@/routes/v1/comments/CommentsController';
import { TEST_COMMENT, TEST_DEFAULT_QUERY_LIMIT, TEST_QUERY_LIMIT } from '@/tests/constants';

// First mock dependencies
vi.mock('@/lib/services/comment');

// Then mock methods and their return values/implementations
vi.mocked(commentService.getAll).mockResolvedValue([TEST_COMMENT] as unknown as IComment[]);
vi.mocked(commentService.getOne).mockResolvedValue(TEST_COMMENT as unknown as IComment);
vi.mocked(commentService.create).mockResolvedValue(TEST_COMMENT as unknown as IComment);
vi.mocked(commentService.delete).mockResolvedValue(TEST_COMMENT as unknown as IComment);

describe('CommentsController', () => {
  let commentsController: CommentsController;
  let request: Partial<Request>;
  let response: Partial<Response>;
  let mockResponseJson: Mock;
  let mockResponseStatus: Mock;

  beforeEach(() => {
    commentsController = new CommentsController(commentService);

    mockResponseJson = vi.fn();
    mockResponseStatus = vi.fn().mockReturnValue({ json: mockResponseJson });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  describe('listComments', () => {
    beforeEach(() => {
      request = { query: TEST_QUERY_LIMIT } as unknown as Request;

      response = { status: mockResponseStatus } as unknown as Response;
    });

    test('should list comments', async () => {
      await commentsController.listComments(request as Request, response as Response);

      expect(commentService.getAll).toHaveBeenCalledWith(TEST_QUERY_LIMIT);
      expect(mockResponseStatus).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponseJson).toHaveBeenCalledWith([TEST_COMMENT]);
    });

    test('should list users with default limit and offset', async () => {
      request = { query: {} } as unknown as Request;

      await commentsController.listComments(request as Request, response as Response);

      expect(commentService.getAll).toHaveBeenCalledWith(TEST_DEFAULT_QUERY_LIMIT);
      expect(mockResponseStatus).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponseJson).toHaveBeenCalledWith([TEST_COMMENT]);
    });
  });

  describe('createComment', () => {
    beforeEach(() => {
      request = { body: TEST_COMMENT } as unknown as Request;

      response = { status: mockResponseStatus } as unknown as Response;
    });

    test('should create comment', async () => {
      await commentsController.createComment(request as Request, response as Response);

      expect(commentService.create).toHaveBeenCalledWith(TEST_COMMENT);
      expect(mockResponseStatus).toHaveBeenCalledWith(StatusCodes.CREATED);
      expect(mockResponseJson).toHaveBeenCalledWith(TEST_COMMENT);
    });
  });

  describe('deleteComment', () => {
    beforeEach(() => {
      request = { params: { id: TEST_COMMENT.id } } as unknown as Request;

      response = { status: mockResponseStatus } as unknown as Response;
    });

    test('should create comment', async () => {
      await commentsController.deleteComment(request as Request, response as Response);

      expect(commentService.delete).toHaveBeenCalledWith(TEST_COMMENT.id);
      expect(mockResponseStatus).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponseJson).toHaveBeenCalledWith({ deleted: true });
    });
  });
});
