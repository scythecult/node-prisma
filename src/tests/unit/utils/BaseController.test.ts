import { BaseController } from '@/lib/utils/BaseController';

class TestController extends BaseController {
  getLimit() {
    return this.defaultLimit;
  }

  getOffset() {
    return this.defaultOffset;
  }
}

const testContoller = new TestController();

describe('BaseController', () => {
  it('should have default limit = 10', () => {
    expect(testContoller.getLimit()).toBe(10);
  });

  it('should have default offset = 0', () => {
    expect(testContoller.getOffset()).toBe(0);
  });
});
