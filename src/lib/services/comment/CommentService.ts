import type { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import type { IComment } from '@/db/types/Comment';
import { EntityNotFound } from '@/lib/errors/EntityNotFound';
import type { QueryLimit } from '@/lib/types/request';

export class CommentService {
  #db;
  constructor(db: PrismaClient) {
    this.#db = db;
  }

  async getAll(options: QueryLimit) {
    const { limit, offset } = options;
    const comments = await this.#db.comment.findMany({
      take: limit,
      skip: offset,
    });

    if (!comments?.length) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'No comments found',
        code: 'ERR_NF',
      });
    }

    return comments;
  }

  async getOne(id: string) {
    const comment = await this.#db.comment.findUnique({ where: { id } });

    if (!comment) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'No comment found',
        code: 'ERR_NF',
      });
    }

    return comment;
  }

  async create(data: IComment) {
    return await this.#db.comment.create({ data });
  }

  async delete(id: string) {
    await this.getOne(id);

    return await this.#db.comment.delete({ where: { id } });
  }
}
