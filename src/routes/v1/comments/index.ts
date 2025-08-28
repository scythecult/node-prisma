import { Router } from 'express';
import { createCommentSchema } from '@/db/schemas/comment';
import { paramIdSchema, queryPaginationSchema } from '@/db/schemas/request';
import { AppParams, AppRoute } from '@/lib/constants/app';
import { commentService } from '@/lib/services/comment';
import { authenticateUserMiddleware } from '@/middleware/authenticateUserMiddleware';
import { validationMiddlewareBuilder } from '@/middleware/validationMiddlewareBuilder';
import { CommentsController } from './CommentsController';

const comments = Router();

const commentsController = new CommentsController(commentService);

comments.use(authenticateUserMiddleware);
comments.get(
  AppRoute.ROOT,
  validationMiddlewareBuilder({ query: queryPaginationSchema }),
  commentsController.listComments,
);
comments.post(
  AppRoute.ROOT,
  validationMiddlewareBuilder({ body: createCommentSchema }),
  commentsController.createComment,
);
comments.delete(AppParams.ID, validationMiddlewareBuilder({ params: paramIdSchema }), commentsController.deleteComment);

export { comments };
