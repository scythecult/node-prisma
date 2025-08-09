import type { Prisma } from '@prisma/client';

export class UsersService {
  #users;
  constructor(users: Prisma.UserDelegate) {
    this.#users = users;
  }

  async getAll() {
    return await this.#users.findMany({ include: { publications: true } });
  }

  async getOne(id: number) {
    return await this.#users.findUnique({ where: { id } });
  }

  async create(data: Prisma.UserCreateInput) {
    return await this.#users.create({ data });
  }
}
