import type { Express } from 'express';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { ApiVersion, AppRoute } from '@/lib/constants/app';
import { createServer } from '@/server';

describe('createServer', () => {
  let server: Express;

  beforeAll(() => {
    server = createServer();
  });

  describe('should use certain middlewares', () => {
    test('should remove "x-powered" from headers', async () => {
      const response = await request(server).get(ApiVersion.V1);

      expect(response.headers).not.toHaveProperty('x-powered-by');
      expect(response.header).not.toHaveProperty('x-powered-by');
    });
  });

  describe(`GET ${AppRoute.HEATH}`, () => {
    test('should return status ok', async () => {
      const response = await request(server).get(AppRoute.HEATH);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toBeTruthy();
    });
  });
});
