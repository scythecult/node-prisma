import type { CreatePublicationUseCase } from '../use-cases/publication/CreatePublicationUseCase';
import type { CreateUserUseCase } from '../use-cases/user/CreateUserUseCase';
import type { DeleteUserUseCase } from '../use-cases/user/DeleteUserUseCase';

export type UserUseCase = {
  createUser: CreateUserUseCase;
  deleteUser: DeleteUserUseCase;
};

export type PublicationUseCase = {
  createPublication: CreatePublicationUseCase;
};
