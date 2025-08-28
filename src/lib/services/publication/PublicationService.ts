import type { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import type { IPublication } from '@/db/types/Publication';
import { Publication } from '@/lib/entities/Publication';
import { EntityNotFound } from '@/lib/errors/EntityNotFound';
import type { QueryLimit } from '@/lib/types/request';

export class PublicationService {
  #db;

  constructor(db: PrismaClient) {
    this.#db = db;
  }
  async getAll(userId: string, options: QueryLimit) {
    const { limit, offset } = options;

    const publications = await this.#db.publication.findMany({
      take: limit,
      skip: offset,
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

  async create(data: IPublication) {
    return await this.#db.publication.create({ data });
  }

  async update(id: string, data: IPublication) {
    return await this.#db.publication.update({ where: { id }, data });
  }

  async updateLikeCount(id: string, userId: string) {
    const publicationData = await this.getOne(id, userId);
    const publication = new Publication(publicationData);

    publication.updateLikeCount();

    return await this.update(id, publication.getAsDto());
  }
}
