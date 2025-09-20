import type { Express, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import type { IComment } from '@/db/types/Comment';
import { ApiVersion, AppRoute } from '@/lib/constants/app';
import { commentService } from '@/lib/services/comment';
import { createServer } from '@/server';
import { TEST_COMMENT } from '@/tests/constants';

vi.mock('morgan', () => {
  return {
    default: () => (request: Request, response: Response, next: NextFunction) => next(),
  };
});

vi.mock('@/middleware/authenticateUserMiddleware', () => {
  return {
    authenticateUserMiddleware: (request: Request, response: Response, next: NextFunction) => next(),
  };
});

// https://chatgpt.com/c/68bd7667-5554-8324-904c-2a1b12b3e14c
vi.mock('@/lib/services/comment');
vi.mocked(commentService.getAll).mockResolvedValue([TEST_COMMENT] as unknown as IComment[]);
vi.mocked(commentService.getOne).mockResolvedValue(TEST_COMMENT as unknown as IComment);
vi.mocked(commentService.create).mockResolvedValue(TEST_COMMENT as unknown as IComment);
vi.mocked(commentService.delete).mockResolvedValue(TEST_COMMENT as unknown as IComment);

describe('comments router', () => {
  let server: Express;

  beforeAll(() => {
    server = createServer();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  describe('GET /comments', () => {
    test('should list comments', async () => {
      const response = await request(server).get(`${ApiVersion.V1}${AppRoute.COMMENTS}?limit=2&offset=0`);

      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body[0].message).toEqual(TEST_COMMENT.message);
      expect(response.status).toEqual(StatusCodes.OK);
    });

    test('should throw an error if no query params provided', async () => {
      const response = await request(server).get(`${ApiVersion.V1}${AppRoute.COMMENTS}`);

      expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toEqual('Validation error');
      expect(response.body.error.code).toEqual('ERR_VALID');
    });
  });

  describe('POST /comments', () => {
    test('should create a new comment', async () => {
      const response = await request(server).post(`${ApiVersion.V1}${AppRoute.COMMENTS}`).send({
        user_id: 'cme9qjbrw0000i0dhbl852gg1',
        publication_id: 'cme9qjbv300fki0dho0ef8rho',
        message: 'Very good picture',
      });

      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body.message).toEqual(TEST_COMMENT.message);
      expect(response.status).toEqual(StatusCodes.CREATED);
    });

    test('should throw an error if no certain property doesnt provided', async () => {
      const response = await request(server).post(`${ApiVersion.V1}${AppRoute.COMMENTS}`).send({
        publication_id: 'cme9qjbv300fki0dho0ef8rho',
        message: 'Very good picture',
      });

      expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toEqual('Validation error');
      expect(response.body.error.code).toEqual('ERR_VALID');
    });
  });

  describe('DELETE /comments', () => {
    test('should delete certain comment', async () => {
      const response = await request(server).delete(`${ApiVersion.V1}${AppRoute.COMMENTS}/1`);

      expect(response.body).toHaveProperty('deleted');
      expect(response.body.deleted).toBeTruthy();
      expect(response.status).toEqual(StatusCodes.OK);
    });

    test('should throw an error if no id-param doesnt provided', async () => {
      const response = await request(server).delete(`${ApiVersion.V1}${AppRoute.COMMENTS}`);

      expect(response.status).toEqual(StatusCodes.NOT_FOUND);
    });
  });
});
