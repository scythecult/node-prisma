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

  listPublicationComments = async (request: Request, response: Response) => {
    const { id } = request.params;
    // TODO Mb should change the method namig
    const publication = await this.publicationsService.getOneWithComments(+id);

    response.status(StatusCodes.OK).json(publication);
  };

  createPublication = async (request: Request, response: Response) => {
    const publication = await this.publicationsService.create(request.body);

    response.status(StatusCodes.CREATED).json(publication);
  };
}
