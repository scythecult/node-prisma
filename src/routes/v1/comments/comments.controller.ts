import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { EntityNotFound } from '@/lib/errors/EntityNotFound';
import type { CommentsService } from './comments.service';

export class CommentsController {
  #commentsService: CommentsService;
  constructor(commentsService: CommentsService) {
    this.#commentsService = commentsService;
  }

  listComments = async (request: Request, response: Response) => {
    const comments = await this.#commentsService.getAll();

    if (!comments.length) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'No comments found',
        code: 'ERR_NF',
      });
    }

    response.status(StatusCodes.OK).json(comments);
  };

  createComment = async (request: Request, response: Response) => {
    const comment = await this.#commentsService.create(request.body);

    response.status(StatusCodes.CREATED).json(comment);
  };
}
