import type { Prisma } from '@prisma/client';

export class PublicationsService {
  #publications;
  #commets;

  constructor(publications: Prisma.PublicationDelegate, comments: Prisma.CommentDelegate) {
    this.#publications = publications;
    this.#commets = comments;
  }
  async getAll(userId: string) {
    return await this.#publications.findMany({ where: { user_id: userId }, include: { comments: true } });
  }

  async getOne(id: string, userId: string) {
    return await this.#publications.findUnique({ where: { id, user_id: userId }, include: { comments: true } });
  }

  async getPublicationComments(id: string, userId: string) {
    return await this.#commets.findMany({ where: { publication_id: id, user_id: userId } });
  }

  async create(data: Prisma.PublicationCreateInput) {
    return await this.#publications.create({ data });
  }
}
