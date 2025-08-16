import type { Prisma } from '@prisma/client';

export class UsersService {
  #users;
  constructor(users: Prisma.UserDelegate) {
    this.#users = users;
  }

  async getAll() {
    return await this.#users.findMany({ include: { publications: true } });
  }

  async getOne(id: string) {
    return await this.#users.findUnique({ where: { id }, include: { publications: true } });
  }

  async getOneByEmail(email: string) {
    return await this.#users.findUnique({ where: { email }, include: { publications: true } });
  }

  async create(data: Prisma.UserCreateInput) {
    return await this.#users.create({ data });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return await this.#users.update({ where: { id }, data });
  }

  async delete(id: string) {
    return await this.#users.delete({ where: { id } });
  }
}
