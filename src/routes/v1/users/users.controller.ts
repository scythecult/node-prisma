import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController } from '@/lib/controller/BaseController';
import { logger } from '@/lib/utils/logger';
import type { UsersService } from './users.service';

export class UsersController extends BaseController {
  #service;
  constructor(service: UsersService) {
    super();
    this.#service = service;
  }

  listUsers = async (request: Request, response: Response) => {
    const limit = Number(request.query.limit) || this.defaultLimit;
    const offset = Number(request.query.offset) || this.defaultOffset;

    // As a example, we are logging the user ID
    logger.debug('Requesting users');
    logger
      .child({
        logMetadata: `User ${request.auth.payload.id}`,
      })
      .debug('is requesting users');

    const users = await this.#service.getAll({ limit, offset });

    response.status(StatusCodes.OK).json(users);
  };

  getUser = async (request: Request, response: Response) => {
    // No need to destruct request.params, the route will thrown 404 without it
    const user = await this.#service.getOne(request.params.id);

    response.status(StatusCodes.OK).json(user);
  };

  createUser = async (request: Request, response: Response) => {
    const { email } = request.body;

    await this.#service.getOneByEmail(email);

    const newUser = await this.#service.create(request.body);

    response.status(StatusCodes.CREATED).json(newUser);
  };

  updateUser = async (request: Request, response: Response) => {
    const user = await this.#service.update(request.params.id, request.body);

    response.status(StatusCodes.OK).json(user);
  };

  deleteUser = async (request: Request, response: Response) => {
    await this.#service.delete(request.params.id);

    response.status(StatusCodes.OK).json({ deleted: true });
  };
}
