import { json } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { Server } from 'node:http';
import request from 'supertest';
import z from 'zod';
import { ApiVersion } from '@/lib/constants/app';
import { errorMiddleware } from '@/middleware/errorMiddleware';
import { validationMiddlewareBuilder } from '@/middleware/validationMiddlewareBuilder';
import { simpleMiddleware } from '@/tests/simpleMiddleware';
import { createMockServer } from '@/tests/utils';

describe('validationMiddlewareBuilder', () => {
  const schema = z.object({ name: z.string() });
  let server: Server;

  beforeAll(() => {
    server = createMockServer((app) => {
      app.use(json());
      app.use(validationMiddlewareBuilder({ body: schema }));
      app.use(errorMiddleware);
      app.use(simpleMiddleware);
    });
  });

  afterAll(() => {
    server.close();
  });

  test('should validate', async () => {
    const response = await request(server).get(`${ApiVersion.V1}`).send({ name: 'check' });

    expect(response.status).toEqual(StatusCodes.OK);
  });

  test('should throw validation error', async () => {
    const response = await request(server).get(`${ApiVersion.V1}`).send({ check: 'name' });

    expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
  });
});
