import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { UsersService } from './users.service';

export class UsersController {
  usersService;
  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  listUsers = async (request: Request, response: Response) => {
    const users = await this.usersService.getAll();

    response.status(StatusCodes.OK).json(users);
  };

  createUser = async (request: Request, response: Response) => {
    const user = await this.usersService.create(request.body);

    response.status(StatusCodes.CREATED).json(user);
  };
}
