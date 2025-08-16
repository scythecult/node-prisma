import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { EntityNotFound } from '@/lib/errors/EntityNotFound';
import type { PublicationsService } from './publications.service';

export class PublicationsController {
  publicationsService;

  constructor(publicationsService: PublicationsService) {
    this.publicationsService = publicationsService;
  }

  listPublications = async (request: Request, response: Response) => {
    const publications = await this.publicationsService.getAll(request.auth.payload.id);

    if (!publications.length) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'No publications found',
        code: 'ERR_NF',
      });
    }

    response.status(StatusCodes.OK).json(publications);
  };

  listPublicationComments = async (request: Request, response: Response) => {
    const comments = await this.publicationsService.getPublicationComments(request.params.id, request.auth.payload.id);

    if (!comments.length) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'No comments found',
        code: 'ERR_NF',
      });
    }

    response.status(StatusCodes.OK).json(comments);
  };

  getPublication = async (request: Request, response: Response) => {
    const publication = await this.publicationsService.getOne(request.params.id, request.auth.payload.id);

    if (!publication) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'No publication found',
        code: 'ERR_NF',
      });
    }

    response.status(StatusCodes.OK).json(publication);
  };

  createPublication = async (request: Request, response: Response) => {
    const publication = await this.publicationsService.create(request.body);

    response.status(StatusCodes.CREATED).json(publication);
  };
}
