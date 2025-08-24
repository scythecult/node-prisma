import { prisma } from '@/db/prisma';
import { PublicationService } from './PublicationService';

export const publicationService = new PublicationService(prisma);
