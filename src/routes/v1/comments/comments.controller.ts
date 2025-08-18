import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { CommentsService } from './comments.service';

export class CommentsController {
  #commentsService: CommentsService;
  constructor(commentsService: CommentsService) {
    this.#commentsService = commentsService;
  }

  listComments = async (request: Request, response: Response) => {
    const comments = await this.#commentsService.getAll();

    response.status(StatusCodes.OK).json(comments);
  };

  createComment = async (request: Request, response: Response) => {
    const comment = await this.#commentsService.create(request.body);

    response.status(StatusCodes.CREATED).json(comment);
  };
}
