import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController } from '@/lib/controller/BaseController';
import type { PublicationUseCase } from '@/lib/types/useCase';
import type { PublicationService } from '../../../lib/services/publication/PublicationService';

export class PublicationsController extends BaseController {
  #service;
  #useCase;
  constructor(service: PublicationService, useCase: PublicationUseCase) {
    super();
    this.#service = service;
    this.#useCase = useCase;
  }

  listPublications = async (request: Request, response: Response) => {
    const publications = await this.#service.getAll(request.auth.payload.id);

    response.status(StatusCodes.OK).json(publications);
  };

  listPublicationComments = async (request: Request, response: Response) => {
    const comments = await this.#service.getPublicationComments(request.params.id, request.auth.payload.id);

    response.status(StatusCodes.OK).json(comments);
  };

  getPublication = async (request: Request, response: Response) => {
    const publication = await this.#service.getOne(request.params.id, request.auth.payload.id);

    response.status(StatusCodes.OK).json(publication);
  };

  createPublication = async (request: Request, response: Response) => {
    const publication = await this.#useCase.createPublication.execute(request);

    response.status(StatusCodes.CREATED).json(publication);
  };
}
