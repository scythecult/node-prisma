import { Router } from 'express';
import { AppRoute } from '../../../constants/app';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../db/prisma';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';

const publications = Router();

const publicationsService = new PublicationsService(prisma.publication);
const publicationsController = new PublicationsController(publicationsService);

publications.get(AppRoute.ROOT, publicationsController.listPublications);
publications.post(AppRoute.ROOT, publicationsController.createPublication);

export { publications };
