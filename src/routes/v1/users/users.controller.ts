import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { EntityNotFound } from '@/lib/errors/EntityNotFound';
import { logger } from '@/lib/utils/logger';
import type { UsersService } from './users.service';

export class UsersController {
  usersService;
  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  listUsers = async (request: Request, response: Response) => {
    // As a example, we are logging the user ID
    logger.debug('Requesting users');
    logger
      .child({
        logMetadata: `User ${request.auth.payload.id}`,
      })
      .debug('is requesting users');

    const users = await this.usersService.getAll();

    if (!users.length) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'No users found',
        code: 'ERR_NF',
      });
    }

    response.status(StatusCodes.OK).json(users);
  };

  getUser = async (request: Request, response: Response) => {
    // No need to destruct request.params, the route will thrown 404 without it
    const user = await this.usersService.getOne(request.params.id);

    if (!user) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'No user found',
        code: 'ERR_NF',
      });
    }

    response.status(StatusCodes.OK).json(user);
  };

  createUser = async (request: Request, response: Response) => {
    const { email } = request.body;

    const user = await this.usersService.getOneByEmail(email);

    if (user) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'User already exists',
        code: 'ERR_EXISTS',
      });
    }

    const newUser = await this.usersService.create(request.body);

    response.status(StatusCodes.CREATED).json(newUser);
  };

  updateUser = async (request: Request, response: Response) => {
    const user = await this.usersService.update(request.params.id, request.body);

    response.status(StatusCodes.OK).json(user);
  };

  deleteUser = async (request: Request, response: Response) => {
    const user = await this.usersService.getOne(request.params.id);

    if (!user) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'No user found',
        code: 'ERR_NF',
      });
    }

    await this.usersService.delete(request.params.id);

    response.status(StatusCodes.OK).json({ deleted: true });
  };
}
