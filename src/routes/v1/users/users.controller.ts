import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { EntityNotFound } from '../../../lib/errors/EntityNotFound';
import type { UsersService } from './users.service';

export class UsersController {
  usersService;
  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  listUsers = async (request: Request, response: Response) => {
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
    const { id } = request.params;

    const user = await this.usersService.getOne(+id);

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
    const user = await this.usersService.create(request.body);

    response.status(StatusCodes.CREATED).json(user);
  };
}
