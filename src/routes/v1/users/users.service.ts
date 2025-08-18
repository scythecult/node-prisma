import type { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { EntityNotFound } from '@/lib/errors/EntityNotFound';

type GetAllOptions = {
  limit: number;
  offset: number;
};

export class UsersService {
  #users;
  constructor(users: Prisma.UserDelegate) {
    this.#users = users;
  }

  mapUser(user: Prisma.UserGetPayload<{ include: { publications: true } }>) {
    return {
      id: user.id,
      user_id: user.user_id,
      email: user.email,
      username: user.username,
      password: user.password,
      fullname: user.fullname,
      birthdate: user.birthdate,
      avatar_url: user.avatar_url,
      publications: user.publications,
    };
  }

  async getAll(options: GetAllOptions) {
    const { limit, offset } = options;
    const users = await this.#users.findMany({
      take: limit,
      skip: offset,
      include: { publications: true, subscribed_users: true },
    });

    if (!users.length) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'No users found',
        code: 'ERR_NF',
      });
    }

    return users;
  }

  async getOne(id: string) {
    const user = await this.#users.findUnique({ where: { id }, include: { publications: true } });

    if (!user) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'No user found',
        code: 'ERR_NF',
      });
    }

    return user;
  }

  async getOneByEmail(email: string) {
    const user = await this.#users.findUnique({ where: { email }, include: { publications: true } });

    if (user) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'User already exists',
        code: 'ERR_EXISTS',
      });
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    return await this.#users.create({ data });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return await this.#users.update({ where: { id }, data });
  }

  async delete(id: string) {
    const user = await this.getOne(id);

    if (!user) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'No user found',
        code: 'ERR_NF',
      });
    }

    return await this.#users.delete({ where: { id } });
  }
}
