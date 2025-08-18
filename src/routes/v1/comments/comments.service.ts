import type { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { EntityNotFound } from '@/lib/errors/EntityNotFound';

export class CommentsService {
  #comments;
  constructor(comments: Prisma.CommentDelegate) {
    this.#comments = comments;
  }
  async getAll() {
    const comments = await this.#comments.findMany();

    if (!comments.length) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'No comments found',
        code: 'ERR_NF',
      });
    }

    return comments;
  }
  async create(data: Prisma.CommentCreateInput) {
    return await this.#comments.create({ data });
  }
}
