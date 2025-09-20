import { BaseEntity } from '@/lib/utils/BaseEntity';

describe('BaseEntity', () => {
  let entity: BaseEntity;

  beforeAll(() => {
    entity = new BaseEntity();
  });

  describe('constructor', () => {
    test('should have constructor', () => {
      expect(entity).toBeInstanceOf(BaseEntity);
    });
  });

  describe('getAsDto', () => {
    test('should have getAsDto method', () => {
      expect(entity).toHaveProperty('getAsDto');
    });

    test('should return entity as dto', () => {
      expect(entity.getAsDto()).toBe(entity);
    });
  });
});
