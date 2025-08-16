import { Router } from 'express';
import { prisma } from '@/db/prisma';
import { idParamSchema } from '@/db/schemas/request';
import { createUserSchema, updateUserSchema } from '@/db/schemas/user';
import { AppParams, AppRoute } from '@/lib/constants/app';
import { authenticateUserMiddleware } from '@/middleware/authenticateUserMiddleware';
import { validationMiddlewareBuilder } from '@/middleware/validationMiddlewareBuilder';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const users = Router();

const usersService = new UsersService(prisma.user);
const usersController = new UsersController(usersService);

users.use(authenticateUserMiddleware);
users.get(AppRoute.ROOT, usersController.listUsers);
users.get(AppParams.ID, validationMiddlewareBuilder({ params: idParamSchema }), usersController.getUser);
users.post(AppRoute.ROOT, validationMiddlewareBuilder({ body: createUserSchema }), usersController.createUser);
users.put(
  AppParams.ID,
  validationMiddlewareBuilder({ params: idParamSchema, body: updateUserSchema }),
  usersController.updateUser,
);
users.delete(AppParams.ID, validationMiddlewareBuilder({ params: idParamSchema }), usersController.deleteUser);

export { users };
