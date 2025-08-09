import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { PublicationsService } from './publications.service';

export class PublicationsController {
  publicationsService;

  constructor(publicationsService: PublicationsService) {
    this.publicationsService = publicationsService;
  }

  listPublications = async (request: Request, response: Response) => {
    const publications = await this.publicationsService.getAll();

    response.status(StatusCodes.OK).json(publications);
  };

  createPublication = async (request: Request, response: Response) => {
    const publication = await this.publicationsService.create(request.body);

    response.status(StatusCodes.CREATED).json(publication);
  };
}
