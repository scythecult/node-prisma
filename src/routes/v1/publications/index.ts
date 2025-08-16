import { Router } from 'express';
import { prisma } from '@/db/prisma';
import { AppParams, AppRoute } from '@/lib/constants/app';
import { authenticateUserMiddleware } from '@/middleware/authenticateUserMiddleware';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';

const publications = Router();

const publicationsService = new PublicationsService(prisma.publication, prisma.comment);
const publicationsController = new PublicationsController(publicationsService);

publications.use(authenticateUserMiddleware);
publications.get(AppRoute.ROOT, publicationsController.listPublications);
publications.get(AppParams.ID, publicationsController.getPublication);
publications.get(`${AppParams.ID}${AppRoute.COMMENTS}`, publicationsController.listPublicationComments);
publications.post(AppRoute.ROOT, publicationsController.createPublication);

export { publications };
