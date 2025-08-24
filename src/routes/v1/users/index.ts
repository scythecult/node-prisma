import { Router } from 'express';
import { paramIdSchema, queryPaginationSchema } from '@/db/schemas/request';
import { createUserSchema, updateUserSchema } from '@/db/schemas/user';
import { AppParams, AppRoute } from '@/lib/constants/app';
import { mailer } from '@/lib/services/mailer';
import { userService } from '@/lib/services/user';
import { CreateUserUseCase } from '@/lib/use-cases/user/CreateUserUseCase';
import { DeleteUserUseCase } from '@/lib/use-cases/user/DeleteUserUseCase';
import { authenticateUserMiddleware } from '@/middleware/authenticateUserMiddleware';
import { validationMiddlewareBuilder } from '@/middleware/validationMiddlewareBuilder';
import { UsersController } from './UsersController';

const users = Router();

const createUser = new CreateUserUseCase(userService, mailer);
const deleteUser = new DeleteUserUseCase(userService, mailer);
const usersController = new UsersController(userService, { createUser, deleteUser });

users.use(authenticateUserMiddleware);
users.get(AppRoute.ROOT, validationMiddlewareBuilder({ query: queryPaginationSchema }), usersController.listUsers);
users.get(AppParams.ID, validationMiddlewareBuilder({ params: paramIdSchema }), usersController.getUser);
users.post(AppRoute.ROOT, validationMiddlewareBuilder({ body: createUserSchema }), usersController.createUser);
users.put(
  AppParams.ID,
  validationMiddlewareBuilder({ params: paramIdSchema, body: updateUserSchema }),
  usersController.updateUser,
);
users.delete(AppParams.ID, validationMiddlewareBuilder({ params: paramIdSchema }), usersController.deleteUser);

export { users };
