import type { IComment } from '@/db/types/Comment';
import { Comment } from '@/lib/entities/Comment';

const MOCK_COMMENT: IComment = {
  id: 'id',
  user_id: 'user_id',
  created_at: new Date(),
  updated_at: new Date(),
  publication_id: 'publication_id',
  message: 'message',
};

const comment = new Comment(MOCK_COMMENT);

describe('Comment', () => {
  describe('constructor', () => {
    test('should have constructor', () => {
      expect(comment).toBeInstanceOf(Comment);
    });

    test('should initialize with correct properties', () => {
      expect(comment.id).toBe(MOCK_COMMENT.id);
      expect(comment.user_id).toBe(MOCK_COMMENT.user_id);
      expect(comment.created_at).toBe(MOCK_COMMENT.created_at);
      expect(comment.updated_at).toBe(MOCK_COMMENT.updated_at);
      expect(comment.publication_id).toBe(MOCK_COMMENT.publication_id);
      expect(comment.message).toBe(MOCK_COMMENT.message);
    });
  });

  describe('getAsDto', () => {
    test('should have getAsDto method', () => {
      expect(comment).toHaveProperty('getAsDto');
    });

    test('should return comment as dto', () => {
      expect(comment.getAsDto()).toBe(comment);
    });
  });
});
