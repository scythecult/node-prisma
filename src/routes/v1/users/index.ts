import { Router } from 'express';
import { prisma } from '../../../db/prisma';
import { AppParams, AppRoute } from '../../../lib/constants/app';
import { authenticateUserMiddleware } from '../../../middleware/authenticateUserMiddleware';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const users = Router();

const usersService = new UsersService(prisma.user);
const usersController = new UsersController(usersService);

users.use(authenticateUserMiddleware);
users.get(AppRoute.ROOT, usersController.listUsers);
users.get(AppParams.ID, usersController.getUser);
users.post(AppRoute.ROOT, usersController.createUser);

export { users };
