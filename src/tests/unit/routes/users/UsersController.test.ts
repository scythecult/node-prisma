import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { Mock } from 'vitest';
import type { INote } from '@/db/types/Note';
import type { IPublication } from '@/db/types/Publication';
import type { IUser } from '@/db/types/User';
import { userService } from '@/lib/services/user';
import type { CreateUserUseCase } from '@/lib/use-cases/user/CreateUserUseCase';
import type { DeleteUserUseCase } from '@/lib/use-cases/user/DeleteUserUseCase';
import { UsersController } from '@/routes/v1/users/UsersController';
import {
  TEST_DEFAULT_QUERY_LIMIT,
  TEST_QUERY_LIMIT,
  TEST_USER,
  TEST_USER_NOTE,
  TEST_USERS_WITH_PUBLICATIONS,
} from '@/tests/constants';

vi.mock('@/lib/services/user');
vi.mock('@/lib/use-cases/user/CreateUserUseCase.ts');
vi.mock('@/lib/use-cases/user/DeleteUserUseCase.ts');

const TEST_UPDATED_USER = { ...TEST_USER, fullname: 'Buratino' };

type UserWithPublcations = IUser & { publications: IPublication[]; subscribed_users: IUser[] };
type UserWithNotePublcations = IUser & { note: INote; publications: IPublication[]; subscribed_users: IUser[] };

vi.mocked(userService.getAll).mockResolvedValue(TEST_USERS_WITH_PUBLICATIONS as unknown as UserWithPublcations[]);
vi.mocked(userService.getOne).mockResolvedValue(TEST_USER as unknown as UserWithNotePublcations);
vi.mocked(userService.update).mockResolvedValue(TEST_UPDATED_USER as unknown as IUser);
vi.mocked(userService.updateNote).mockResolvedValue(TEST_USER_NOTE as unknown as INote);

// Example
// const mockServiceGetAll = vi.fn().mockResolvedValue(TEST_USERS);
// const mockServiceGetOne = vi.fn().mockResolvedValue(TEST_USER);
// const mockServiceUpdate = vi.fn().mockResolvedValue(TEST_UPDATED_USER);
// const mockServiceUpdateNote = vi.fn().mockResolvedValue(TEST_USER_NOTE);
const mockCreateUserUseCaseExecute = vi.fn().mockResolvedValue(TEST_USER);
const mockDeleteUserUseCaseExecute = vi.fn();

// const mockUserService = {
//   getAll: mockServiceGetAll,
//   getOne: mockServiceGetOne,
//   update: mockServiceUpdate,
//   updateNote: mockServiceUpdateNote,
// } as unknown as UserService;

const mockCreateUserUseCase = {
  execute: mockCreateUserUseCaseExecute,
} as unknown as CreateUserUseCase;

const mockDeleteUserUseCase = {
  execute: mockDeleteUserUseCaseExecute,
} as unknown as DeleteUserUseCase;

describe('UsersController', () => {
  let usersController: UsersController;
  let request: Partial<Request>;
  let response: Partial<Response>;
  let mockResponseJson: Mock;
  let mockResponseStatus: Mock;

  beforeEach(() => {
    usersController = new UsersController(userService, {
      createUser: mockCreateUserUseCase,
      deleteUser: mockDeleteUserUseCase,
    });

    mockResponseJson = vi.fn();
    mockResponseStatus = vi.fn().mockReturnValue({ json: mockResponseJson });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  describe('listUsers', () => {
    beforeEach(() => {
      request = { query: TEST_QUERY_LIMIT } as unknown as Request;

      response = { status: mockResponseStatus } as unknown as Response;
    });

    test('should list users', async () => {
      await usersController.listUsers(request as Request, response as Response);

      expect(userService.getAll).toHaveBeenCalledWith(TEST_QUERY_LIMIT);
      expect(mockResponseStatus).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponseJson).toHaveBeenCalledWith(TEST_USERS_WITH_PUBLICATIONS);
    });

    test('should list users with default limit and offset', async () => {
      request = { query: {} } as unknown as Request;

      await usersController.listUsers(request as Request, response as Response);

      expect(userService.getAll).toHaveBeenCalledWith(TEST_DEFAULT_QUERY_LIMIT);
      expect(mockResponseStatus).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponseJson).toHaveBeenCalledWith(TEST_USERS_WITH_PUBLICATIONS);
    });
  });

  describe('getUser', () => {
    beforeEach(() => {
      request = { params: { id: TEST_USER.id } } as unknown as Request;

      response = { status: mockResponseStatus } as unknown as Response;
    });

    test('should get user', async () => {
      await usersController.getUser(request as Request, response as Response);

      expect(userService.getOne).toHaveBeenCalledWith(TEST_USER.id);
      expect(mockResponseStatus).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponseJson).toHaveBeenCalledWith(TEST_USER);
    });
  });

  describe('createUser', async () => {
    beforeEach(() => {
      request = { body: TEST_USER } as unknown as Request;

      response = { status: mockResponseStatus } as unknown as Response;
    });

    test('should create user', async () => {
      await usersController.createUser(request as Request, response as Response);

      expect(mockCreateUserUseCaseExecute).toHaveBeenCalledOnce();
      expect(mockCreateUserUseCaseExecute).toHaveBeenCalledWith(request);
      expect(mockResponseStatus).toHaveBeenCalledWith(StatusCodes.CREATED);
      expect(mockResponseJson).toHaveBeenCalledWith(TEST_USER);
    });
  });

  describe('updateUser', async () => {
    beforeEach(() => {
      request = { params: { id: TEST_USER.id }, body: TEST_UPDATED_USER } as unknown as Request;

      response = { status: mockResponseStatus } as unknown as Response;
    });

    test('should update user', async () => {
      await usersController.updateUser(request as Request, response as Response);

      expect(userService.update).toHaveBeenCalledWith(TEST_USER.id, TEST_UPDATED_USER);
      expect(mockResponseStatus).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponseJson).toHaveBeenCalledWith(TEST_UPDATED_USER);
    });
  });

  describe('updateNote', async () => {
    beforeEach(() => {
      request = { params: { id: TEST_USER.id }, body: TEST_USER_NOTE } as unknown as Request;

      response = { status: mockResponseStatus } as unknown as Response;
    });

    test('should update user note', async () => {
      await usersController.updateNote(request as Request, response as Response);

      expect(userService.updateNote).toHaveBeenCalledWith(TEST_USER.id, TEST_USER_NOTE);
      expect(mockResponseStatus).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponseJson).toHaveBeenCalledWith(TEST_USER_NOTE);
    });
  });

  describe('deleteUser', async () => {
    beforeEach(() => {
      request = { params: { id: TEST_USER.id } } as unknown as Request;

      response = { status: mockResponseStatus } as unknown as Response;
    });

    test('should delete user', async () => {
      await usersController.deleteUser(request as Request, response as Response);

      expect(mockDeleteUserUseCaseExecute).toHaveBeenCalledOnce();
      expect(mockDeleteUserUseCaseExecute).toHaveBeenCalledWith(request);
      expect(mockResponseStatus).toHaveBeenCalledWith(StatusCodes.OK);
      expect(mockResponseJson).toHaveBeenCalledWith({ deleted: true });
    });
  });
});
