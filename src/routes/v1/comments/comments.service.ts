import type { Prisma } from '@prisma/client';

export class CommentsService {
  #service;
  constructor(service: Prisma.CommentDelegate) {
    this.#service = service;
  }
  async getAll() {
    return await this.#service.findMany();
  }
  async create(data: Prisma.CommentCreateInput) {
    return await this.#service.create({ data });
  }
}
