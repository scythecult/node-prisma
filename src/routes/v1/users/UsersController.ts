import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController } from '@/lib/controller/BaseController';
import type { UserService } from '@/lib/services/user/UserService';
import type { UserUseCase } from '@/lib/types/useCase';
import { logger } from '@/lib/utils/logger';

export class UsersController extends BaseController {
  #service;
  #useCase;
  constructor(service: UserService, useCase: UserUseCase) {
    super();
    this.#service = service;
    this.#useCase = useCase;
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
    const user = await this.#useCase.createUser.execute(request);

    response.status(StatusCodes.CREATED).json(user);
  };

  updateUser = async (request: Request, response: Response) => {
    const user = await this.#service.update(request.params.id, request.body);

    response.status(StatusCodes.OK).json(user);
  };

  deleteUser = async (request: Request, response: Response) => {
    await this.#useCase.deleteUser.execute(request);

    response.status(StatusCodes.OK).json({ deleted: true });
  };
}
