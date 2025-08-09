import type { Prisma } from '@prisma/client';
export class PublicationsService {
  #service;

  constructor(service: Prisma.PublicationDelegate) {
    this.#service = service;
  }
  async getAll() {
    return await this.#service.findMany({ include: { comments: true } });
  }

  async getOneWithComments(id: number) {
    return await this.#service.findUnique({ where: { id }, include: { comments: true } });
  }

  async create(data: Prisma.PublicationCreateInput) {
    return await this.#service.create({ data });
  }
}
