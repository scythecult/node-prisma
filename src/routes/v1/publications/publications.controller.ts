import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController } from '@/lib/controller/BaseController';
import type { PublicationsService } from './publications.service';

export class PublicationsController extends BaseController {
  #service;

  constructor(service: PublicationsService) {
    super();
    this.#service = service;
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
    const publication = await this.#service.create(request.body);

    response.status(StatusCodes.CREATED).json(publication);
  };
}
