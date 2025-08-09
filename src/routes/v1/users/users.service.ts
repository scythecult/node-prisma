import type { Prisma } from '@prisma/client';

export class UsersService {
  #service;
  constructor(service: Prisma.UserDelegate) {
    this.#service = service;
  }

  async getAll() {
    return await this.#service.findMany({ include: { publications: true } });
  }

  async getOne(id: number) {
    return await this.#service.findUnique({ where: { id } });
  }

  async create(data: Prisma.UserCreateInput) {
    return await this.#service.create({ data });
  }
}
