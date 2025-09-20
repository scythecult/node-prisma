import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { Server } from 'node:http';
import request from 'supertest';
import { z } from 'zod';
import { config } from '@/config';
import { ApiVersion } from '@/lib/constants/app';
import { CustomError } from '@/lib/errors/CustomError';
import { errorMiddleware } from '@/middleware/errorMiddleware';
import { createMockServer } from '@/tests/utils';

const configDebugOriginal = config.debug;

vi.mock('@/lib/utils/utils.ts', () => ({
  getErrorMessage: vi.fn(),
}));

describe('errorMiddleware', () => {
  let error: Error;
  let server: Server;

  describe('common error', () => {
    beforeAll(() => {
      config.debug = true;

      server = createMockServer((app) => {
        app.get(`${ApiVersion.V1}`, (request: Request, response: Response, next: NextFunction) => {
          next(error);
        });
        app.use(errorMiddleware);
      });
    });

    afterAll(() => {
      config.debug = configDebugOriginal;

      server.close();
    });

    beforeEach(() => {
      error = new Error('Test error');
    });

    test('should pass error to node error handler', async () => {
      const response = await request(server).get(`${ApiVersion.V1}`);

      expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });

  describe('custom error', () => {
    beforeAll(() => {
      server = createMockServer((app) => {
        app.get(`${ApiVersion.V1}`, (request: Request, response: Response, next: NextFunction) => {
          next(error);
        });
        app.use(errorMiddleware);
      });
    });

    afterAll(() => {
      server.close();
    });

    beforeEach(() => {
      error = new Error('Test error');
    });

    test('should response with custom error', async () => {
      error = new CustomError({ message: 'Custom error message', statusCode: StatusCodes.BAD_REQUEST, code: 'ERR_NF' });
      const response = await request(server).get(`${ApiVersion.V1}`);

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
  });

  describe('zod error', () => {
    const schema = z.object({
      id: z.string(),
    });

    beforeAll(() => {
      server = createMockServer((app) => {
        app.get(`${ApiVersion.V1}`, async (request: Request, response: Response, next: NextFunction) => {
          try {
            await schema.parseAsync(request.params);

            response.json({ success: true });
          } catch (error) {
            next(error);
          }
        });
        app.use(errorMiddleware);
      });
    });

    afterAll(() => {
      server.close();
    });

    test('should response with zod error', async () => {
      const response = await request(server).get(`${ApiVersion.V1}`);

      expect(response.statusCode).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
    });
  });

  describe('node global error handler', () => {
    beforeAll(() => {
      server = createMockServer((app) => {
        app.get(`${ApiVersion.V1}`, (request: Request, response: Response, next: NextFunction) => {
          next(error);
        });
        app.use(errorMiddleware);
      });
    });

    afterAll(() => {
      server.close();
    });

    beforeEach(() => {
      error = new Error('Test error');
    });

    test('should response with error', async () => {
      const response = await request(server).get(`${ApiVersion.V1}`);

      expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    });

    test('should response with default error message', async () => {
      const response = await request(server).get(`${ApiVersion.V1}`);

      expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body.error.message).toEqual('Internal server error. Please view logs for more details');
    });
  });
});
