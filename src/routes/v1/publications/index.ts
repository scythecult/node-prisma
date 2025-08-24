import { Router } from 'express';
import { createPublicationSchema } from '@/db/schemas/publication';
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

// TODO Add valiation
publications.use(authenticateUserMiddleware);
publications.get(AppRoute.ROOT, publicationsController.listPublications);
publications.get(AppParams.ID, publicationsController.getPublication);
publications.get(`${AppParams.ID}${AppRoute.COMMENTS}`, publicationsController.listPublicationComments);
publications.post(
  AppRoute.ROOT,
  validationMiddlewareBuilder({ body: createPublicationSchema }),
  publicationsController.createPublication,
);

export { publications };
