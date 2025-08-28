import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController } from '@/lib/utils/BaseController';
import type { CommentService } from '../../../lib/services/comment/CommentService';

export class CommentsController extends BaseController {
  #service;
  constructor(service: CommentService) {
    super();
    this.#service = service;
  }

  listComments = async (request: Request, response: Response) => {
    const limit = Number(request.query.limit) || this.defaultLimit;
    const offset = Number(request.query.offset) || this.defaultOffset;

    const comments = await this.#service.getAll({ limit, offset });

    response.status(StatusCodes.OK).json(comments);
  };

  createComment = async (request: Request, response: Response) => {
    const comment = await this.#service.create(request.body);

    response.status(StatusCodes.CREATED).json(comment);
  };

  deleteComment = async (request: Request, response: Response) => {
    await this.#service.delete(request.params.id);

    response.status(StatusCodes.OK).json({ deleted: true });
  };
}
