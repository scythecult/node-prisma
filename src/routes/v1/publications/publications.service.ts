import type { Prisma } from '@prisma/client';

export class PublicationsService {
  #publications;
  #commets;

  constructor(publications: Prisma.PublicationDelegate, comments: Prisma.CommentDelegate) {
    this.#publications = publications;
    this.#commets = comments;
  }
  async getAll() {
    return await this.#publications.findMany({ include: { comments: true } });
  }

  async getOne(id: string) {
    return await this.#publications.findUnique({ where: { id } });
  }

  async getPublicationComments(id: string) {
    return await this.#commets.findMany({ where: { publication_id: id } });
  }

  async create(data: Prisma.PublicationCreateInput) {
    return await this.#publications.create({ data });
  }
}
