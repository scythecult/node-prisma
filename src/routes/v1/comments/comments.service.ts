import type { Prisma } from '@prisma/client';

export class CommentsService {
  #comments;
  constructor(comments: Prisma.CommentDelegate) {
    this.#comments = comments;
  }
  async getAll() {
    return await this.#comments.findMany();
  }
  async create(data: Prisma.CommentCreateInput) {
    return await this.#comments.create({ data });
  }
}
