import type { PrismaClient } from '@prisma/client';
import type { IComment } from '@/db/types/Comment';
import { CommentService } from '@/lib/services/comment/CommentService';
import { TEST_COMMENT } from '@/tests/constants';

const mockCommentModel = {
  findMany: vi.fn(),
  findUnique: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
};

const mockPrismaClient = {
  comment: mockCommentModel,
} as unknown as PrismaClient;

const id = '1';
const options = { limit: 2, offset: 0 };

describe('CommentService', () => {
  const commentService = new CommentService(mockPrismaClient);

  describe('getAll', () => {
    test('should thrown an error if no comments found', async () => {
      mockCommentModel.findMany = vi.fn().mockResolvedValue([]);

      await expect(commentService.getAll(options)).rejects.toThrow('No comments found');

      mockCommentModel.findMany = vi.fn().mockResolvedValue(undefined);

      await expect(commentService.getAll(options)).rejects.toThrow('No comments found');
    });

    test('should return an array of comments', async () => {
      mockCommentModel.findMany = vi.fn().mockResolvedValue([TEST_COMMENT]);

      const comments = await commentService.getAll(options);

      expect(comments).toEqual([TEST_COMMENT]);
    });
  });

  describe('getOne', () => {
    test('should thrown an error if no comment found', async () => {
      mockCommentModel.findUnique = vi.fn().mockReturnValue(null);

      await expect(commentService.getOne(id)).rejects.toThrow('No comment found');
    });

    test('should return a comment', async () => {
      mockCommentModel.findUnique = vi.fn().mockResolvedValue(TEST_COMMENT);

      const comments = await commentService.getOne(id);

      expect(comments).toEqual(TEST_COMMENT);
    });
  });

  describe('create', () => {
    test('should create and return a created comment', async () => {
      mockCommentModel.create = vi.fn().mockResolvedValue(TEST_COMMENT);

      const comment = await commentService.create(TEST_COMMENT as unknown as IComment);

      expect(comment).toEqual(TEST_COMMENT);
    });
  });

  describe('delete', () => {
    test('should delete and return a deleted comment', async () => {
      mockCommentModel.delete = vi.fn().mockResolvedValue(TEST_COMMENT);

      const comment = await commentService.delete(id);

      expect(comment).toEqual(TEST_COMMENT);
    });
  });
});
