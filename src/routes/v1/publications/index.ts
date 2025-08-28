import { Router } from 'express';
import { createPublicationSchema } from '@/db/schemas/publication';
import { paramIdSchema, queryPaginationSchema } from '@/db/schemas/request';
import { AppParams, AppRoute } from '@/lib/constants/app';
import { mailer } from '@/lib/services/mailer';
import { publicationService } from '@/lib/services/publication';
import { userService } from '@/lib/services/user';
import { CreatePublicationUseCase } from '@/lib/use-cases/publication/CreatePublicationUseCase';
import { authenticateUserMiddleware } from '@/middleware/authenticateUserMiddleware';
import { validationMiddlewareBuilder } from '@/middleware/validationMiddlewareBuilder';
import { PublicationsController } from './PublicationsController';

const publications = Router();

const createPublication = new CreatePublicationUseCase(publicationService, userService, mailer);
const publicationsController = new PublicationsController(publicationService, { createPublication });

publications.use(authenticateUserMiddleware);
publications.get(
  AppRoute.ROOT,
  validationMiddlewareBuilder({ query: queryPaginationSchema }),
  publicationsController.listPublications,
);
publications.get(
  AppParams.ID,
  validationMiddlewareBuilder({ params: paramIdSchema }),
  publicationsController.getPublication,
);
publications.post(
  AppRoute.ROOT,
  validationMiddlewareBuilder({ body: createPublicationSchema }),
  publicationsController.createPublication,
);
publications.get(
  `${AppParams.ID}${AppRoute.COMMENTS}`,
  validationMiddlewareBuilder({ params: paramIdSchema }),
  publicationsController.listPublicationComments,
);
publications.patch(
  `${AppParams.ID}${AppRoute.LIKE}`,
  validationMiddlewareBuilder({ params: paramIdSchema }),
  publicationsController.updateLikeCount,
);

export { publications };
