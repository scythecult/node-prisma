import { Router } from 'express';
import { prisma } from '../../../db/prisma';
import { AppRoute } from '../../../constants/app';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';

const comments = Router();

const commentsService = new CommentsService(prisma.comment);
const commentsController = new CommentsController(commentsService);

comments.get(AppRoute.ROOT, commentsController.listComments);
comments.post(AppRoute.ROOT, commentsController.createComment);

export { comments };
