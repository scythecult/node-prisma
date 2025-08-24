import type { Prisma, PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { EntityNotFound } from '@/lib/errors/EntityNotFound';

export class PublicationService {
  #db;

  constructor(db: PrismaClient) {
    this.#db = db;
  }
  async getAll(userId: string) {
    const publications = await this.#db.publication.findMany({
      where: { user_id: userId },
      include: { comments: true },
    });

    if (!publications.length) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'No publications found',
        code: 'ERR_NF',
      });
    }

    return publications;
  }

  async getPublicationComments(id: string, userId: string) {
    const comments = await this.#db.comment.findMany({ where: { publication_id: id, user_id: userId } });

    if (!comments.length) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'No comments found',
        code: 'ERR_NF',
      });
    }

    return comments;
  }

  async getOne(id: string, userId: string) {
    const publication = await this.#db.publication.findUnique({
      where: { id, user_id: userId },
      include: { comments: true },
    });

    if (!publication) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'No publication found',
        code: 'ERR_NF',
      });
    }

    return publication;
  }

  async create(data: Prisma.PublicationCreateInput) {
    return await this.#db.publication.create({ data });
  }
}
