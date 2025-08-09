import { Router } from 'express';
import { AppRoute } from '../../../constants/app';
import { prisma } from '../../../db/prisma';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';

const publications = Router();

const publicationsService = new PublicationsService(prisma.publication);
const publicationsController = new PublicationsController(publicationsService);

publications.get(AppRoute.ROOT, publicationsController.listPublications);
publications.get(`/:id${AppRoute.COMMENTS}`, publicationsController.listPublicationComments);
publications.post(AppRoute.ROOT, publicationsController.createPublication);

export { publications };
