import type { IPublication } from '@/db/types/Publication';
import { Publication } from '@/lib/entities/Publication';

const MOCK_PUBLICATION: IPublication = {
  id: 'id',
  user_id: 'user_id',
  picture_url: 'picture_url',
  likes: 0,
  is_liked: false,
  description: 'description',
  created_at: new Date(),
  updated_at: new Date(),
};

const publication = new Publication(MOCK_PUBLICATION);

describe('Publication', () => {
  describe('constructor', () => {
    test('should have constructor', () => {
      expect(publication).toBeInstanceOf(Publication);
    });

    test('should initialize with correct properties', () => {
      expect(publication.id).toBe(MOCK_PUBLICATION.id);
      expect(publication.user_id).toBe(MOCK_PUBLICATION.user_id);
      expect(publication.picture_url).toBe(MOCK_PUBLICATION.picture_url);
      expect(publication.likes).toBe(MOCK_PUBLICATION.likes);
      expect(publication.is_liked).toBe(MOCK_PUBLICATION.is_liked);
      expect(publication.description).toBe(MOCK_PUBLICATION.description);
      expect(publication.created_at).toBe(MOCK_PUBLICATION.created_at);
      expect(publication.updated_at).toBe(MOCK_PUBLICATION.updated_at);
    });
  });

  describe('updateLikeCount', () => {
    test('should have updateLikeCount method', () => {
      expect(publication).toHaveProperty('updateLikeCount');
    });

    test('should update like count', () => {
      expect(publication.likes).toBe(0);
      expect(publication.is_liked).toBeFalsy();

      publication.updateLikeCount();

      expect(publication.likes).toBe(1);
      expect(publication.is_liked).toBeTruthy();

      publication.updateLikeCount();

      expect(publication.likes).toBe(0);
      expect(publication.is_liked).toBeFalsy();
    });
  });

  describe('getAsDto', () => {
    test('should have getAsDto method', () => {
      expect(publication).toHaveProperty('getAsDto');
    });

    test('should return publication as dto', () => {
      expect(publication.getAsDto()).toBe(publication);
    });
  });
});
