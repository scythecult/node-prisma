import { Router } from 'express';
import { AppRoute } from '../../../constants/app';
import { prisma } from '../../../db/prisma';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const users = Router();

const usersService = new UsersService(prisma.user);
const usersController = new UsersController(usersService);

// users.use('AuthMiddleware')
users.get(AppRoute.ROOT, usersController.listUsers);
users.get('/:id', usersController.getUser);
users.post(AppRoute.ROOT, usersController.createUser);

export { users };
