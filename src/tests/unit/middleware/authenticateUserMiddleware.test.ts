import { StatusCodes } from 'http-status-codes';
import type { Server } from 'node:http';
import request from 'supertest';
import type { Mock } from 'vitest';
import { ApiVersion, AppRoute } from '@/lib/constants/app';
import { verifyJWT } from '@/lib/utils/auth';
import { authenticateUserMiddleware } from '@/middleware/authenticateUserMiddleware';
import { errorMiddleware } from '@/middleware/errorMiddleware';
import { simpleMiddleware } from '@/tests/simpleMiddleware';
import { createMockServer } from '@/tests/utils';

vi.mock('@/lib/utils/auth');

console.error = vi.fn();

describe('authenticateUserMiddleware', () => {
  let server: Server;

  describe('auth error', () => {
    beforeAll(() => {
      (verifyJWT as Mock).mockImplementation(vi.fn().mockReturnValue({ payload: 'check' }));

      server = createMockServer((app) => {
        app.use(authenticateUserMiddleware);
        app.use(errorMiddleware);
      });
    });

    afterAll(() => {
      server.close();
      vi.clearAllMocks();
    });

    test('should throw an authentication error if token not provided', async () => {
      const response = await request(server).get(`${ApiVersion.V1}${AppRoute.USERS}`);

      expect(response.status).toEqual(StatusCodes.UNAUTHORIZED);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toEqual('Authorization header missing or malformed');
      expect(response.body.error.code).toEqual('ERR_AUTH');
    });
  });

  describe('verification error', () => {
    beforeAll(() => {
      (verifyJWT as Mock).mockImplementation(vi.fn().mockRejectedValue(undefined));

      server = createMockServer((app) => {
        app.use(authenticateUserMiddleware);
        app.use(errorMiddleware);
      });
    });

    afterAll(() => {
      server.close();
      vi.clearAllMocks();
    });

    test('should throw a jwt verification error', async () => {
      const response = await request(server).get(`${ApiVersion.V1}${AppRoute.USERS}`).set({
        Authorization: 'Bearer token',
      });

      expect(response.status).toEqual(StatusCodes.FORBIDDEN);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toEqual('You are not authorized to perform this operation');
      expect(response.body.error.code).toEqual('ERR_AUTH');
    });
  });

  describe('verification passed', () => {
    beforeAll(() => {
      (verifyJWT as Mock).mockImplementation(vi.fn().mockReturnValue({ payload: 'success' }));

      server = createMockServer((app) => {
        app.use(authenticateUserMiddleware);
        app.use(simpleMiddleware);
      });
    });

    afterAll(() => {
      server.close();
      vi.clearAllMocks();
    });

    test('should pass authentication', async () => {
      const response = await request(server).get(`${ApiVersion.V1}${AppRoute.USERS}`).set({
        Authorization: 'Bearer token',
      });

      expect(response.status).toEqual(StatusCodes.OK);
    });
  });
});
